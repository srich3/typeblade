import React from 'react';

const COLOR_NEUTRAL = '#5eead4';
const COLOR_GOOD = '#ffe066';
const COLOR_GREY = '#6b7280';

const KEY_ROWS = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['z','x','c','v','b','n','m'],
  [' '], // Spacebar row
];

export default function KeyboardLegend({ highlightKey }: { highlightKey: string }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 24,
      marginBottom: 12,
      userSelect: 'none',
    }}>
      {KEY_ROWS.map((row, rowIdx) => (
        <div key={rowIdx} style={{ display: 'flex', marginBottom: rowIdx === 3 ? 0 : 6 }}>
          {row.map((key) => {
            const isSpace = key === ' ';
            const display = isSpace ? '' : key.toUpperCase();
            const width = isSpace ? 220 : 36;
            const highlight =
              (highlightKey === ' ' && isSpace) ||
              (highlightKey && key === highlightKey.toLowerCase());
            return (
              <div
                key={key}
                style={{
                  width,
                  height: 44,
                  margin: isSpace ? '0 8px' : '0 3px',
                  borderRadius: 8,
                  background: highlight ? COLOR_GOOD : COLOR_GREY,
                  color: highlight ? '#222' : COLOR_NEUTRAL,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: 20,
                  boxShadow: highlight ? '0 0 8px 2px #ffe06688' : undefined,
                  border: highlight ? `2px solid ${COLOR_GOOD}` : `1px solid ${COLOR_GREY}`,
                  transition: 'background 0.2s, color 0.2s, border 0.2s',
                }}
              >
                {isSpace ? '' : display}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
} 