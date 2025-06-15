interface CharacterIllustrationProps {
  type: 'have_team' | 'no_team' | 'no_topic' | 'dominant_member' | 'decision_conflict' | 'communication' | 'success';
  className?: string;
}

export function CharacterIllustration({ type, className = "w-20 h-20" }: CharacterIllustrationProps) {
  const illustrations = {
    have_team: (
      <svg viewBox="0 0 120 100" className={className}>
        {/* Background desk */}
        <rect x="10" y="70" width="100" height="8" fill="#E5E5E5" rx="4"/>
        
        {/* Person 1 - Left */}
        <g>
          {/* Body */}
          <ellipse cx="25" cy="55" rx="8" ry="12" fill="#1E88E5"/>
          {/* Head */}
          <circle cx="25" cy="35" r="8" fill="#F4C2A1"/>
          {/* Hair */}
          <path d="M17,32 Q25,25 33,32 Q33,28 25,28 Q17,28 17,32" fill="#8B4513"/>
          {/* Eyes */}
          <circle cx="22" cy="34" r="1" fill="#333"/>
          <circle cx="28" cy="34" r="1" fill="#333"/>
          {/* Mouth */}
          <path d="M23,38 Q25,40 27,38" stroke="#333" strokeWidth="1" fill="none"/>
          {/* Laptop */}
          <rect x="18" y="65" width="14" height="8" fill="#666" rx="1"/>
          <rect x="19" y="66" width="12" height="6" fill="#87CEEB"/>
        </g>
        
        {/* Person 2 - Center */}
        <g>
          {/* Body */}
          <ellipse cx="50" cy="55" rx="8" ry="12" fill="#FFD400"/>
          {/* Head */}
          <circle cx="50" cy="35" r="8" fill="#F4C2A1"/>
          {/* Hair */}
          <ellipse cx="50" cy="30" rx="9" ry="6" fill="#654321"/>
          {/* Eyes */}
          <circle cx="47" cy="34" r="1" fill="#333"/>
          <circle cx="53" cy="34" r="1" fill="#333"/>
          {/* Mouth */}
          <path d="M48,38 Q50,40 52,38" stroke="#333" strokeWidth="1" fill="none"/>
          {/* Documents */}
          <rect x="45" y="62" width="10" height="12" fill="white" stroke="#DDD"/>
          <line x1="47" y1="65" x2="53" y2="65" stroke="#333" strokeWidth="0.5"/>
          <line x1="47" y1="67" x2="53" y2="67" stroke="#333" strokeWidth="0.5"/>
        </g>
        
        {/* Person 3 - Right */}
        <g>
          {/* Body */}
          <ellipse cx="75" cy="55" rx="8" ry="12" fill="#4CAF50"/>
          {/* Head */}
          <circle cx="75" cy="35" r="8" fill="#F4C2A1"/>
          {/* Hair */}
          <rect x="68" y="28" width="14" height="8" fill="#2C1810" rx="7"/>
          {/* Eyes */}
          <circle cx="72" cy="34" r="1" fill="#333"/>
          <circle cx="78" cy="34" r="1" fill="#333"/>
          {/* Mouth */}
          <path d="M73,38 Q75,40 77,38" stroke="#333" strokeWidth="1" fill="none"/>
          {/* Chart/Whiteboard */}
          <rect x="85" y="45" width="12" height="8" fill="white" stroke="#DDD"/>
          <path d="M87,51 L89,49 L91,50 L93,47 L95,48" stroke="#1E88E5" strokeWidth="1.5" fill="none"/>
        </g>
        
        {/* Collaboration lines */}
        <path d="M33,50 Q41,45 42,50" stroke="#1E88E5" strokeWidth="1.5" fill="none" strokeDasharray="2,2"/>
        <path d="M58,50 Q66,45 67,50" stroke="#1E88E5" strokeWidth="1.5" fill="none" strokeDasharray="2,2"/>
      </svg>
    ),
    
    no_team: (
      <svg viewBox="0 0 120 100" className={className}>
        {/* Background desk */}
        <rect x="20" y="70" width="80" height="8" fill="#E5E5E5" rx="4"/>
        
        {/* Main person */}
        <g>
          {/* Body */}
          <ellipse cx="60" cy="55" rx="10" ry="14" fill="#1E88E5"/>
          {/* Head */}
          <circle cx="60" cy="35" r="9" fill="#F4C2A1"/>
          {/* Hair */}
          <path d="M51,32 Q60,24 69,32 Q69,27 60,27 Q51,27 51,32" fill="#8B4513"/>
          {/* Eyes */}
          <circle cx="56" cy="34" r="1.5" fill="#333"/>
          <circle cx="64" cy="34" r="1.5" fill="#333"/>
          {/* Mouth */}
          <path d="M57,39 Q60,41 63,39" stroke="#333" strokeWidth="1" fill="none"/>
        </g>
        
        {/* Laptop */}
        <rect x="52" y="62" width="16" height="10" fill="#666" rx="1"/>
        <rect x="53" y="63" width="14" height="8" fill="#87CEEB"/>
        
        {/* Search elements around */}
        <g opacity="0.6">
          {/* Search icon */}
          <circle cx="30" cy="40" r="4" fill="none" stroke="#FFD400" strokeWidth="2"/>
          <line x1="33" y1="43" x2="36" y2="46" stroke="#FFD400" strokeWidth="2"/>
          
          {/* Network nodes */}
          <circle cx="90" cy="35" r="3" fill="#FFD400"/>
          <circle cx="95" cy="45" r="2" fill="#FFD400"/>
          <circle cx="85" cy="50" r="2" fill="#FFD400"/>
          <line x1="90" y1="35" x2="95" y2="45" stroke="#FFD400" strokeWidth="1"/>
          <line x1="95" y1="45" x2="85" y2="50" stroke="#FFD400" strokeWidth="1"/>
          
          {/* Question marks */}
          <text x="25" y="60" fill="#999" fontSize="12" fontFamily="system-ui">?</text>
          <text x="85" y="25" fill="#999" fontSize="12" fontFamily="system-ui">?</text>
        </g>
        
        {/* Profile cards floating */}
        <g opacity="0.7">
          <rect x="15" y="20" width="12" height="8" fill="white" stroke="#DDD" rx="1"/>
          <circle cx="18" cy="23" r="1.5" fill="#DDD"/>
          <line x1="20" y1="22" x2="25" y2="22" stroke="#DDD" strokeWidth="0.5"/>
          <line x1="20" y1="24" x2="25" y2="24" stroke="#DDD" strokeWidth="0.5"/>
        </g>
      </svg>
    ),
    
    no_topic: (
      <svg viewBox="0 0 120 100" className={className}>
        {/* Background desk */}
        <rect x="15" y="70" width="90" height="8" fill="#E5E5E5" rx="4"/>
        
        {/* Main person */}
        <g>
          {/* Body */}
          <ellipse cx="45" cy="55" rx="10" ry="14" fill="#FFD400"/>
          {/* Head */}
          <circle cx="45" cy="35" r="9" fill="#F4C2A1"/>
          {/* Hair */}
          <ellipse cx="45" cy="29" rx="10" ry="7" fill="#654321"/>
          {/* Eyes */}
          <circle cx="41" cy="34" r="1.5" fill="#333"/>
          <circle cx="49" cy="34" r="1.5" fill="#333"/>
          {/* Mouth - thinking expression */}
          <path d="M42,39 Q45,37 48,39" stroke="#333" strokeWidth="1" fill="none"/>
        </g>
        
        {/* Lightbulb above head */}
        <g>
          <ellipse cx="45" cy="15" rx="4" ry="5" fill="#FFF59D" stroke="#FFD400" strokeWidth="1"/>
          <rect x="43" y="19" width="4" height="2" fill="#DDD"/>
          <line x1="41" y1="12" x2="39" y2="10" stroke="#FFD400" strokeWidth="1"/>
          <line x1="49" y1="12" x2="51" y2="10" stroke="#FFD400" strokeWidth="1"/>
          <line x1="45" y1="8" x2="45" y2="6" stroke="#FFD400" strokeWidth="1"/>
        </g>
        
        {/* Research materials */}
        <g>
          {/* Books stack */}
          <rect x="65" y="60" width="15" height="3" fill="#1E88E5"/>
          <rect x="65" y="63" width="15" height="3" fill="#4CAF50"/>
          <rect x="65" y="66" width="15" height="3" fill="#FF9800"/>
          
          {/* Papers scattered */}
          <rect x="25" y="65" width="12" height="8" fill="white" stroke="#DDD" transform="rotate(-5 31 69)"/>
          <line x1="27" y1="67" x2="35" y2="67" stroke="#333" strokeWidth="0.5"/>
          <line x1="27" y1="69" x2="35" y2="69" stroke="#333" strokeWidth="0.5"/>
          <line x1="27" y1="71" x2="33" y2="71" stroke="#333" strokeWidth="0.5"/>
          
          {/* Laptop open */}
          <rect x="85" y="58" width="18" height="12" fill="#666" rx="1"/>
          <rect x="86" y="59" width="16" height="10" fill="#87CEEB"/>
          <rect x="88" y="61" width="12" height="1" fill="white"/>
          <rect x="88" y="63" width="10" height="1" fill="white"/>
          <rect x="88" y="65" width="8" height="1" fill="white"/>
        </g>
        
        {/* Thought bubbles with question marks */}
        <g opacity="0.6">
          <circle cx="30" cy="25" r="3" fill="white" stroke="#DDD"/>
          <text x="27.5" y="28" fill="#999" fontSize="6" fontFamily="system-ui">?</text>
          
          <circle cx="65" cy="20" r="2" fill="white" stroke="#DDD"/>
          <text x="63.5" y="22.5" fill="#999" fontSize="5" fontFamily="system-ui">?</text>
        </g>
      </svg>
    ),

    dominant_member: (
      <svg viewBox="0 0 120 100" className={className}>
        {/* Conference table */}
        <ellipse cx="60" cy="75" rx="45" ry="12" fill="#E5E5E5"/>
        
        {/* Dominant person - larger, centered */}
        <g>
          {/* Body */}
          <ellipse cx="60" cy="50" rx="12" ry="16" fill="#FF5722"/>
          {/* Head */}
          <circle cx="60" cy="30" r="10" fill="#F4C2A1"/>
          {/* Hair */}
          <rect x="52" y="22" width="16" height="10" fill="#2C1810" rx="8"/>
          {/* Eyes */}
          <circle cx="56" cy="29" r="1.5" fill="#333"/>
          <circle cx="64" cy="29" r="1.5" fill="#333"/>
          {/* Mouth - talking */}
          <ellipse cx="60" cy="33" rx="3" ry="1.5" fill="#333"/>
          {/* Arms gesturing */}
          <ellipse cx="45" cy="45" rx="3" ry="8" fill="#FF5722" transform="rotate(-30 45 45)"/>
          <ellipse cx="75" cy="45" rx="3" ry="8" fill="#FF5722" transform="rotate(30 75 45)"/>
        </g>
        
        {/* Other team members - smaller, quieter */}
        <g opacity="0.7">
          {/* Person 1 */}
          <ellipse cx="25" cy="55" rx="6" ry="10" fill="#9E9E9E"/>
          <circle cx="25" cy="40" r="6" fill="#F4C2A1"/>
          <circle cx="23" cy="39" r="1" fill="#333"/>
          <circle cx="27" cy="39" r="1" fill="#333"/>
          <line x1="24" y1="42" x2="26" y2="42" stroke="#333" strokeWidth="0.5"/>
          
          {/* Person 2 */}
          <ellipse cx="95" cy="55" rx="6" ry="10" fill="#9E9E9E"/>
          <circle cx="95" cy="40" r="6" fill="#F4C2A1"/>
          <circle cx="93" cy="39" r="1" fill="#333"/>
          <circle cx="97" cy="39" r="1" fill="#333"/>
          <line x1="94" y1="42" x2="96" y2="42" stroke="#333" strokeWidth="0.5"/>
        </g>
        
        {/* Speech indicators */}
        <g opacity="0.8">
          <ellipse cx="75" cy="25" rx="3" ry="2" fill="white" stroke="#FF5722"/>
          <ellipse cx="80" cy="20" rx="2" ry="1.5" fill="white" stroke="#FF5722"/>
          <ellipse cx="83" cy="16" rx="1" ry="1" fill="white" stroke="#FF5722"/>
        </g>
      </svg>
    ),

    decision_conflict: (
      <svg viewBox="0 0 120 100" className={className}>
        {/* Meeting room table */}
        <rect x="30" y="70" width="60" height="8" fill="#E5E5E5" rx="4"/>
        
        {/* Person 1 - Left, pointing */}
        <g>
          <ellipse cx="35" cy="55" rx="8" ry="12" fill="#2196F3"/>
          <circle cx="35" cy="35" r="8" fill="#F4C2A1"/>
          <ellipse cx="35" cy="30" rx="9" ry="6" fill="#8B4513"/>
          <circle cx="32" cy="34" r="1" fill="#333"/>
          <circle cx="38" cy="34" r="1" fill="#333"/>
          <path d="M33,38 Q35,36 37,38" stroke="#333" strokeWidth="1" fill="none"/>
          {/* Pointing arm */}
          <ellipse cx="48" cy="50" rx="3" ry="8" fill="#2196F3" transform="rotate(45 48 50)"/>
        </g>
        
        {/* Person 2 - Right, opposing */}
        <g>
          <ellipse cx="85" cy="55" rx="8" ry="12" fill="#FF9800"/>
          <circle cx="85" cy="35" r="8" fill="#F4C2A1"/>
          <path d="M77,32 Q85,25 93,32 Q93,28 85,28 Q77,28 77,32" fill="#654321"/>
          <circle cx="82" cy="34" r="1" fill="#333"/>
          <circle cx="88" cy="34" r="1" fill="#333"/>
          <path d="M83,38 Q85,36 87,38" stroke="#333" strokeWidth="1" fill="none"/>
          {/* Opposing arm */}
          <ellipse cx="72" cy="50" rx="3" ry="8" fill="#FF9800" transform="rotate(-45 72 50)"/>
        </g>
        
        {/* Conflict indicators */}
        <g opacity="0.6">
          {/* Lightning between them */}
          <path d="M55,45 L60,40 L58,40 L63,30 L58,35 L60,35 L55,45" fill="#FF5722"/>
          
          {/* Tension lines */}
          <line x1="43" y1="50" x2="77" y2="50" stroke="#FF5722" strokeWidth="2" strokeDasharray="3,3"/>
        </g>
        
        {/* Question marks above */}
        <text x="55" y="25" fill="#FF5722" fontSize="16" fontFamily="system-ui" textAnchor="middle">?</text>
      </svg>
    ),

    communication: (
      <svg viewBox="0 0 120 100" className={className}>
        {/* Video call grid background */}
        <rect x="10" y="20" width="100" height="60" fill="#f8f9fa" stroke="#ddd" rx="4"/>
        <line x1="60" y1="20" x2="60" y2="80" stroke="#ddd"/>
        <line x1="10" y1="50" x2="110" y2="50" stroke="#ddd"/>
        
        {/* Person 1 - Top left */}
        <g>
          <ellipse cx="35" cy="40" rx="6" ry="8" fill="#4CAF50"/>
          <circle cx="35" cy="30" r="5" fill="#F4C2A1"/>
          <circle cx="33" cy="29" r="0.8" fill="#333"/>
          <circle cx="37" cy="29" r="0.8" fill="#333"/>
          <path d="M34,32 Q35,33 36,32" stroke="#333" strokeWidth="0.8" fill="none"/>
        </g>
        
        {/* Person 2 - Top right */}
        <g>
          <ellipse cx="85" cy="40" rx="6" ry="8" fill="#2196F3"/>
          <circle cx="85" cy="30" r="5" fill="#F4C2A1"/>
          <circle cx="83" cy="29" r="0.8" fill="#333"/>
          <circle cx="87" cy="29" r="0.8" fill="#333"/>
          <path d="M84,32 Q85,33 86,32" stroke="#333" strokeWidth="0.8" fill="none"/>
        </g>
        
        {/* Person 3 - Bottom left */}
        <g>
          <ellipse cx="35" cy="65" rx="6" ry="8" fill="#FF9800"/>
          <circle cx="35" cy="55" r="5" fill="#F4C2A1"/>
          <circle cx="33" cy="54" r="0.8" fill="#333"/>
          <circle cx="37" cy="54" r="0.8" fill="#333"/>
          <path d="M34,57 Q35,58 36,57" stroke="#333" strokeWidth="0.8" fill="none"/>
        </g>
        
        {/* Person 4 - Bottom right */}
        <g>
          <ellipse cx="85" cy="65" rx="6" ry="8" fill="#9C27B0"/>
          <circle cx="85" cy="55" r="5" fill="#F4C2A1"/>
          <circle cx="83" cy="54" r="0.8" fill="#333"/>
          <circle cx="87" cy="54" r="0.8" fill="#333"/>
          <path d="M84,57 Q85,58 86,57" stroke="#333" strokeWidth="0.8" fill="none"/>
        </g>
        
        {/* Communication flow arrows */}
        <g opacity="0.7">
          <path d="M45,35 Q55,30 65,35" stroke="#4CAF50" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)"/>
          <path d="M75,45 Q70,55 65,65" stroke="#2196F3" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)"/>
          <path d="M45,60 Q55,65 65,60" stroke="#FF9800" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)"/>
        </g>
        
        {/* Chat indicators */}
        <g opacity="0.8">
          <rect x="15" y="85" width="12" height="6" fill="white" stroke="#ddd" rx="1"/>
          <circle cx="18" cy="87" r="0.5" fill="#4CAF50"/>
          <circle cx="20" cy="87" r="0.5" fill="#4CAF50"/>
          <circle cx="22" cy="87" r="0.5" fill="#4CAF50"/>
        </g>
        
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
          </marker>
        </defs>
      </svg>
    ),

    success: (
      <svg viewBox="0 0 120 100" className={className}>
        {/* Celebration background */}
        <rect x="0" y="0" width="120" height="100" fill="url(#successGradient)"/>
        
        {/* Team celebrating */}
        <g>
          {/* Person 1 */}
          <ellipse cx="30" cy="60" rx="8" ry="12" fill="#4CAF50"/>
          <circle cx="30" cy="40" r="8" fill="#F4C2A1"/>
          <circle cx="27" cy="39" r="1" fill="#333"/>
          <circle cx="33" cy="39" r="1" fill="#333"/>
          <path d="M27,43 Q30,45 33,43" stroke="#333" strokeWidth="1" fill="none"/>
          {/* Raised arm */}
          <ellipse cx="20" cy="45" rx="3" ry="8" fill="#4CAF50" transform="rotate(-45 20 45)"/>
        </g>
        
        <g>
          {/* Person 2 */}
          <ellipse cx="60" cy="60" rx="8" ry="12" fill="#2196F3"/>
          <circle cx="60" cy="40" r="8" fill="#F4C2A1"/>
          <circle cx="57" cy="39" r="1" fill="#333"/>
          <circle cx="63" cy="39" r="1" fill="#333"/>
          <path d="M57,43 Q60,45 63,43" stroke="#333" strokeWidth="1" fill="none"/>
          {/* Both arms raised */}
          <ellipse cx="50" cy="45" rx="3" ry="8" fill="#2196F3" transform="rotate(-45 50 45)"/>
          <ellipse cx="70" cy="45" rx="3" ry="8" fill="#2196F3" transform="rotate(45 70 45)"/>
        </g>
        
        <g>
          {/* Person 3 */}
          <ellipse cx="90" cy="60" rx="8" ry="12" fill="#FF9800"/>
          <circle cx="90" cy="40" r="8" fill="#F4C2A1"/>
          <circle cx="87" cy="39" r="1" fill="#333"/>
          <circle cx="93" cy="39" r="1" fill="#333"/>
          <path d="M87,43 Q90,45 93,43" stroke="#333" strokeWidth="1" fill="none"/>
          {/* Raised arm */}
          <ellipse cx="100" cy="45" rx="3" ry="8" fill="#FF9800" transform="rotate(45 100 45)"/>
        </g>
        
        {/* Success elements */}
        <g opacity="0.8">
          {/* Trophy */}
          <rect x="55" y="75" width="10" height="8" fill="#FFD700"/>
          <ellipse cx="60" cy="75" rx="6" ry="3" fill="#FFD700"/>
          <rect x="58" y="83" width="4" height="6" fill="#8B4513"/>
          <ellipse cx="60" cy="89" rx="8" ry="2" fill="#8B4513"/>
          
          {/* Stars */}
          <text x="25" y="25" fill="#FFD700" fontSize="12" fontFamily="system-ui">★</text>
          <text x="85" y="25" fill="#FFD700" fontSize="8" fontFamily="system-ui">★</text>
          <text x="105" y="35" fill="#FFD700" fontSize="10" fontFamily="system-ui">★</text>
          
          {/* Confetti */}
          <rect x="40" y="20" width="2" height="2" fill="#FF5722" transform="rotate(45 41 21)"/>
          <rect x="75" y="15" width="2" height="2" fill="#4CAF50" transform="rotate(45 76 16)"/>
          <rect x="15" y="30" width="2" height="2" fill="#2196F3" transform="rotate(45 16 31)"/>
        </g>
        
        <defs>
          <linearGradient id="successGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor:'#E8F5E8', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#C8E6C9', stopOpacity:1}} />
          </linearGradient>
        </defs>
      </svg>
    )
  };
  
  return illustrations[type] || illustrations.have_team;
}