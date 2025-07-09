-- Create keytana table to track user blade progress
CREATE TABLE keytanas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    blade_length INTEGER NOT NULL DEFAULT 30,
    blade_sharpness INTEGER NOT NULL DEFAULT 5,
    blade_quality INTEGER NOT NULL DEFAULT 5,
    handle_quality INTEGER NOT NULL DEFAULT 5,
    guard_design INTEGER NOT NULL DEFAULT 5,
    defects JSONB DEFAULT '[]',
    color_scheme TEXT NOT NULL DEFAULT 'common',
    total_practice_sessions INTEGER NOT NULL DEFAULT 0,
    best_wpm INTEGER NOT NULL DEFAULT 0,
    best_accuracy DECIMAL(5,2) NOT NULL DEFAULT 0,
    total_mistakes INTEGER NOT NULL DEFAULT 0,
    total_time_practiced INTEGER NOT NULL DEFAULT 0, -- in seconds
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create keytana_progress table to track individual forging sessions
CREATE TABLE keytana_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    session_wpm INTEGER NOT NULL,
    session_accuracy DECIMAL(5,2) NOT NULL,
    session_mistakes INTEGER NOT NULL,
    session_duration INTEGER NOT NULL, -- in seconds
    improvements JSONB DEFAULT '[]', -- track what improved
    defects_added JSONB DEFAULT '[]', -- track new defects
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies for keytana tables
ALTER TABLE keytanas ENABLE ROW LEVEL SECURITY;
ALTER TABLE keytana_progress ENABLE ROW LEVEL SECURITY;

-- Keytana policies
CREATE POLICY "Users can view their own keytana" ON keytanas
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own keytana" ON keytanas
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own keytana" ON keytanas
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Keytana progress policies
CREATE POLICY "Users can view their own progress" ON keytana_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON keytana_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to update keytana after a practice session
CREATE OR REPLACE FUNCTION update_keytana_after_session(
    p_user_id UUID,
    p_wpm INTEGER,
    p_accuracy DECIMAL,
    p_mistakes INTEGER,
    p_duration INTEGER
)
RETURNS VOID AS $$
DECLARE
    v_keytana_id UUID;
    v_current_keytana RECORD;
    v_improvements JSONB := '[]';
    v_defects_added JSONB := '[]';
    v_new_blade_length INTEGER;
    v_new_blade_sharpness INTEGER;
    v_new_blade_quality INTEGER;
    v_new_handle_quality INTEGER;
    v_new_guard_design INTEGER;
    v_new_color_scheme TEXT;
BEGIN
    -- Get or create keytana for user
    SELECT id INTO v_keytana_id FROM keytanas WHERE user_id = p_user_id;
    
    IF v_keytana_id IS NULL THEN
        -- Create new keytana
        INSERT INTO keytanas (user_id, blade_length, blade_sharpness, blade_quality, handle_quality, guard_design, color_scheme)
        VALUES (p_user_id, 30, 5, 5, 5, 5, 'common')
        RETURNING id INTO v_keytana_id;
    END IF;
    
    -- Get current keytana stats
    SELECT * INTO v_current_keytana FROM keytanas WHERE id = v_keytana_id;
    
    -- Calculate new stats based on performance
    v_new_blade_length := GREATEST(30, LEAST(60, v_current_keytana.blade_length + (p_wpm - 30) * 0.1));
    v_new_blade_sharpness := GREATEST(1, LEAST(10, v_current_keytana.blade_sharpness + (p_accuracy - 80) * 0.05));
    v_new_blade_quality := GREATEST(1, LEAST(10, v_current_keytana.blade_quality + (p_accuracy - 80) * 0.05 - p_mistakes * 0.2));
    v_new_handle_quality := GREATEST(1, LEAST(10, v_current_keytana.handle_quality + (p_wpm + p_accuracy - 150) * 0.01));
    v_new_guard_design := GREATEST(1, LEAST(10, v_current_keytana.guard_design + (100 - p_mistakes) * 0.1));
    
    -- Determine color scheme
    v_new_color_scheme := CASE 
        WHEN (p_wpm / 100.0 + p_accuracy / 100.0) / 2 >= 0.9 THEN 'legendary'
        WHEN (p_wpm / 100.0 + p_accuracy / 100.0) / 2 >= 0.8 THEN 'epic'
        WHEN (p_wpm / 100.0 + p_accuracy / 100.0) / 2 >= 0.7 THEN 'rare'
        WHEN (p_wpm / 100.0 + p_accuracy / 100.0) / 2 >= 0.6 THEN 'common'
        ELSE 'rusty'
    END;
    
    -- Track improvements
    IF v_new_blade_length > v_current_keytana.blade_length THEN
        v_improvements := v_improvements || '["blade_length"]';
    END IF;
    IF v_new_blade_sharpness > v_current_keytana.blade_sharpness THEN
        v_improvements := v_improvements || '["blade_sharpness"]';
    END IF;
    IF v_new_blade_quality > v_current_keytana.blade_quality THEN
        v_improvements := v_improvements || '["blade_quality"]';
    END IF;
    IF v_new_handle_quality > v_current_keytana.handle_quality THEN
        v_improvements := v_improvements || '["handle_quality"]';
    END IF;
    IF v_new_guard_design > v_current_keytana.guard_design THEN
        v_improvements := v_improvements || '["guard_design"]';
    END IF;
    
    -- Track new defects based on mistakes
    IF p_mistakes >= 5 THEN
        v_defects_added := v_defects_added || '["chipped_blade"]';
    END IF;
    IF p_mistakes >= 3 THEN
        v_defects_added := v_defects_added || '["rust_spots"]';
    END IF;
    IF p_accuracy < 80 THEN
        v_defects_added := v_defects_added || '["dull_edge"]';
    END IF;
    IF p_wpm < 20 THEN
        v_defects_added := v_defects_added || '["uneven_grind"]';
    END IF;
    
    -- Update keytana
    UPDATE keytanas SET
        blade_length = v_new_blade_length,
        blade_sharpness = v_new_blade_sharpness,
        blade_quality = v_new_blade_quality,
        handle_quality = v_new_handle_quality,
        guard_design = v_new_guard_design,
        color_scheme = v_new_color_scheme,
        total_practice_sessions = total_practice_sessions + 1,
        best_wpm = GREATEST(best_wpm, p_wpm),
        best_accuracy = GREATEST(best_accuracy, p_accuracy),
        total_mistakes = total_mistakes + p_mistakes,
        total_time_practiced = total_time_practiced + p_duration,
        updated_at = NOW()
    WHERE id = v_keytana_id;
    
    -- Record progress
    INSERT INTO keytana_progress (user_id, session_wpm, session_accuracy, session_mistakes, session_duration, improvements, defects_added)
    VALUES (p_user_id, p_wpm, p_accuracy, p_mistakes, p_duration, v_improvements, v_defects_added);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for updated_at on keytanas
CREATE TRIGGER update_keytanas_updated_at
    BEFORE UPDATE ON keytanas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 