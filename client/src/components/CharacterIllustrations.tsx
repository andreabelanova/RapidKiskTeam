interface CharacterIllustrationProps {
  type: 'have_team' | 'no_team' | 'no_topic' | 'dominant_member' | 'decision_conflict' | 'communication' | 'success';
  className?: string;
}

export function CharacterIllustration({ type, className = "w-20 h-20" }: CharacterIllustrationProps) {
  const illustrations = {
    have_team: (
      <svg viewBox="0 0 160 120" className={className}>
        {/* Office environment background */}
        <rect x="0" y="0" width="160" height="120" fill="#F8F9FA"/>
        
        {/* Desk surface */}
        <rect x="15" y="85" width="130" height="12" fill="#E8E9EA" rx="2"/>
        <rect x="15" y="85" width="130" height="3" fill="#DDD" rx="2"/>
        
        {/* Computer monitor - central focus */}
        <rect x="65" y="60" width="30" height="20" fill="#2D3748" rx="2"/>
        <rect x="67" y="62" width="26" height="16" fill="#4A90E2"/>
        <rect x="75" y="81" width="14" height="2" fill="#666"/>
        <rect x="77" y="83" width="10" height="4" fill="#888" rx="1"/>
        
        {/* Person 1 - Left, pointing at screen */}
        <g>
          {/* Body - sweater */}
          <path d="M35,50 Q35,45 40,45 L45,45 Q50,45 50,50 L50,70 Q50,75 45,75 L40,75 Q35,75 35,70 Z" fill="#1E88E5"/>
          <path d="M35,48 Q40,46 50,48 Q50,50 45,50 L40,50 Q35,50 35,48 Z" fill="#1A73E8"/>
          
          {/* Head */}
          <ellipse cx="42.5" cy="37" rx="7" ry="8" fill="#F4C2A1"/>
          
          {/* Hair - professional style */}
          <path d="M35,35 Q42.5,28 50,35 Q50,32 42.5,30 Q35,32 35,35 Z" fill="#8B4513"/>
          
          {/* Facial features */}
          <ellipse cx="40" cy="36" rx="1" ry="1.5" fill="#333"/>
          <ellipse cx="45" cy="36" rx="1" ry="1.5" fill="#333"/>
          <path d="M40,40 Q42.5,42 45,40" stroke="#D4736A" strokeWidth="1" fill="none"/>
          
          {/* Arm pointing */}
          <path d="M50,55 Q58,52 62,58" stroke="#1E88E5" strokeWidth="4" strokeLinecap="round"/>
          <ellipse cx="60" cy="60" rx="2.5" ry="2" fill="#F4C2A1"/>
        </g>
        
        {/* Person 2 - Right, taking notes */}
        <g>
          {/* Body - cardigan */}
          <path d="M100,52 Q100,47 105,47 L110,47 Q115,47 115,52 L115,72 Q115,77 110,77 L105,77 Q100,77 100,72 Z" fill="#FFD400"/>
          <path d="M102,49 Q107.5,47 113,49 Q113,51 110,51 L105,51 Q102,51 102,49 Z" fill="#FFC107"/>
          
          {/* Head */}
          <ellipse cx="107.5" cy="39" rx="7" ry="8" fill="#F4C2A1"/>
          
          {/* Hair - bob cut */}
          <path d="M100,37 Q107.5,30 115,37 Q115,34 107.5,32 Q100,34 100,37 Z" fill="#654321"/>
          
          {/* Facial features */}
          <ellipse cx="105" cy="38" rx="1" ry="1.5" fill="#333"/>
          <ellipse cx="110" cy="38" rx="1" ry="1.5" fill="#333"/>
          <path d="M105,42 Q107.5,44 110,42" stroke="#D4736A" strokeWidth="1" fill="none"/>
          
          {/* Notebook and pen */}
          <rect x="118" y="65" width="12" height="16" fill="white" stroke="#DDD" strokeWidth="1"/>
          <line x1="120" y1="68" x2="128" y2="68" stroke="#666" strokeWidth="0.5"/>
          <line x1="120" y1="71" x2="128" y2="71" stroke="#666" strokeWidth="0.5"/>
          <line x1="120" y1="74" x2="125" y2="74" stroke="#666" strokeWidth="0.5"/>
          
          {/* Pen in hand */}
          <line x1="115" y1="60" x2="120" y2="67" stroke="#2D3748" strokeWidth="1.5"/>
        </g>
        
        {/* Person 3 - Center back, facilitating */}
        <g>
          {/* Body - business shirt */}
          <path d="M70,45 Q70,40 75,40 L80,40 Q85,40 85,45 L85,65 Q85,70 80,70 L75,70 Q70,70 70,65 Z" fill="#4CAF50"/>
          <rect x="72" y="42" width="11" height="25" fill="white"/>
          <path d="M72,42 Q77.5,40 83,42 Q83,44 80,44 L75,44 Q72,44 72,42 Z" fill="#388E3C"/>
          
          {/* Head */}
          <ellipse cx="77.5" cy="32" rx="6.5" ry="7.5" fill="#F4C2A1"/>
          
          {/* Hair - professional */}
          <path d="M71,30 Q77.5,24 84,30 Q84,27 77.5,25 Q71,27 71,30 Z" fill="#2C1810"/>
          
          {/* Facial features */}
          <ellipse cx="75" cy="31" rx="1" ry="1.5" fill="#333"/>
          <ellipse cx="80" cy="31" rx="1" ry="1.5" fill="#333"/>
          <path d="M75,35 Q77.5,37 80,35" stroke="#D4736A" strokeWidth="1" fill="none"/>
          
          {/* Arms gesturing */}
          <path d="M70,50 Q65,48 63,53" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
          <path d="M85,50 Q90,48 92,53" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
        </g>
        
        {/* Collaboration elements */}
        <g opacity="0.7">
          {/* Speech/thought indicators */}
          <ellipse cx="55" cy="25" rx="3" ry="2" fill="white" stroke="#1E88E5"/>
          <ellipse cx="58" cy="22" rx="2" ry="1.5" fill="white" stroke="#1E88E5"/>
          <ellipse cx="60" cy="19" rx="1" ry="1" fill="white" stroke="#1E88E5"/>
          
          {/* Connection lines */}
          <path d="M50,60 Q60,55 70,60" stroke="#4A90E2" strokeWidth="1" strokeDasharray="3,2" fill="none"/>
          <path d="M85,55 Q95,50 100,55" stroke="#4A90E2" strokeWidth="1" strokeDasharray="3,2" fill="none"/>
        </g>
        
        {/* Office accessories */}
        <rect x="20" y="75" width="6" height="8" fill="#FF9800" rx="1"/>
        <rect x="135" y="78" width="4" height="5" fill="#9C27B0" rx="0.5"/>
      </svg>
    ),
    
    no_team: (
      <svg viewBox="0 0 160 120" className={className}>
        {/* Modern office background */}
        <rect x="0" y="0" width="160" height="120" fill="#F8F9FA"/>
        
        {/* Desk surface with modern design */}
        <rect x="20" y="85" width="120" height="15" fill="#E8E9EA" rx="3"/>
        <rect x="20" y="85" width="120" height="4" fill="#DDD" rx="3"/>
        
        {/* Main person - networking/searching */}
        <g>
          {/* Body - professional blazer */}
          <path d="M70,55 Q70,50 75,50 L80,50 Q85,50 85,55 L85,75 Q85,80 80,80 L75,80 Q70,80 70,75 Z" fill="#2D3748"/>
          <rect x="72" y="52" width="11" height="25" fill="#4A90E2"/>
          <path d="M72,52 Q77.5,50 83,52 Q83,54 80,54 L75,54 Q72,54 72,52 Z" fill="#1A73E8"/>
          
          {/* Head */}
          <ellipse cx="77.5" cy="42" rx="7.5" ry="8.5" fill="#F4C2A1"/>
          
          {/* Hair - modern professional */}
          <path d="M70,40 Q77.5,32 85,40 Q85,36 77.5,34 Q70,36 70,40 Z" fill="#8B4513"/>
          
          {/* Facial features */}
          <ellipse cx="74" cy="41" rx="1.2" ry="1.8" fill="#333"/>
          <ellipse cx="81" cy="41" rx="1.2" ry="1.8" fill="#333"/>
          <path d="M74,46 Q77.5,48 81,46" stroke="#D4736A" strokeWidth="1.2" fill="none"/>
          
          {/* Arms - one typing, one holding phone */}
          <path d="M70,60 Q65,58 62,63" stroke="#2D3748" strokeWidth="4" strokeLinecap="round"/>
          <ellipse cx="60" cy="65" rx="2.5" ry="2" fill="#F4C2A1"/>
          
          {/* Phone in hand */}
          <rect x="57" y="63" width="6" height="10" fill="#2D3748" rx="2"/>
          <rect x="58" y="64" width="4" height="8" fill="#4A90E2" rx="1"/>
        </g>
        
        {/* Laptop with networking interface */}
        <rect x="85" y="72" width="20" height="13" fill="#2D3748" rx="2"/>
        <rect x="86" y="73" width="18" height="11" fill="#4A90E2"/>
        <rect x="93" y="86" width="6" height="2" fill="#666"/>
        <rect x="95" y="88" width="2" height="3" fill="#888" rx="1"/>
        
        {/* LinkedIn/networking interface on screen */}
        <g opacity="0.9">
          <rect x="87" y="75" width="14" height="2" fill="white"/>
          <rect x="87" y="78" width="10" height="1" fill="#E0E0E0"/>
          <rect x="87" y="80" width="12" height="1" fill="#E0E0E0"/>
          <circle cx="89" cy="76" r="1" fill="#4A90E2"/>
        </g>
        
        {/* Professional networking elements */}
        <g>
          {/* Network connection visualization */}
          <circle cx="25" cy="30" r="8" fill="white" stroke="#4A90E2" strokeWidth="2"/>
          <circle cx="27" cy="28" r="2" fill="#4A90E2"/>
          <text x="20" y="42" fill="#4A90E2" fontSize="8" fontWeight="bold">Connect</text>
          
          <circle cx="135" cy="25" r="8" fill="white" stroke="#FFD400" strokeWidth="2"/>
          <circle cx="137" cy="23" r="2" fill="#FFD400"/>
          <text x="128" y="37" fill="#FFD400" fontSize="8" fontWeight="bold">Network</text>
          
          <circle cx="140" cy="50" r="6" fill="white" stroke="#4CAF50" strokeWidth="2"/>
          <circle cx="141" cy="49" r="1.5" fill="#4CAF50"/>
          <text x="132" y="60" fill="#4CAF50" fontSize="7" fontWeight="bold">Join</text>
        </g>
        
        {/* Connection lines */}
        <g opacity="0.6">
          <path d="M33,35 Q55,25 70,42" stroke="#4A90E2" strokeWidth="2" strokeDasharray="4,3" fill="none"/>
          <path d="M127,30 Q110,35 85,42" stroke="#FFD400" strokeWidth="2" strokeDasharray="4,3" fill="none"/>
          <path d="M134,50 Q115,55 85,50" stroke="#4CAF50" strokeWidth="2" strokeDasharray="4,3" fill="none"/>
        </g>
        
        {/* Search/networking tools on desk */}
        <g>
          {/* Business cards */}
          <rect x="25" y="78" width="12" height="8" fill="white" stroke="#DDD"/>
          <line x1="27" y1="80" x2="35" y2="80" stroke="#666" strokeWidth="0.5"/>
          <line x1="27" y1="82" x2="33" y2="82" stroke="#666" strokeWidth="0.5"/>
          
          {/* Coffee cup */}
          <ellipse cx="48" cy="82" rx="3" ry="2" fill="#8D6E63"/>
          <ellipse cx="48" cy="80" rx="2.5" ry="1.5" fill="#6D4C41"/>
          <path d="M51,81 Q53,81 53,83 Q53,85 51,85" stroke="#8D6E63" strokeWidth="1" fill="none"/>
        </g>
        
        {/* Floating UI elements suggesting digital networking */}
        <g opacity="0.7">
          {/* Notification bubbles */}
          <circle cx="15" cy="55" r="4" fill="#FF5722"/>
          <text x="13" y="58" fill="white" fontSize="6" fontWeight="bold">3</text>
          
          <rect x="145" y="65" width="10" height="6" fill="#4CAF50" rx="3"/>
          <text x="147" y="69" fill="white" fontSize="5" fontWeight="bold">New</text>
        </g>
      </svg>
    ),
    
    no_topic: (
      <svg viewBox="0 0 160 120" className={className}>
        {/* Research lab/library environment */}
        <rect x="0" y="0" width="160" height="120" fill="#F8F9FA"/>
        
        {/* Large research desk */}
        <rect x="10" y="85" width="140" height="15" fill="#E8E9EA" rx="3"/>
        <rect x="10" y="85" width="140" height="4" fill="#DDD" rx="3"/>
        
        {/* Main researcher - thinking pose */}
        <g>
          {/* Body - academic cardigan */}
          <path d="M70,55 Q70,50 75,50 L80,50 Q85,50 85,55 L85,75 Q85,80 80,80 L75,80 Q70,80 70,75 Z" fill="#8D6E63"/>
          <rect x="72" y="52" width="11" height="25" fill="#FFD400"/>
          <path d="M72,52 Q77.5,50 83,52 Q83,54 80,54 L75,54 Q72,54 72,52 Z" fill="#FFC107"/>
          
          {/* Head */}
          <ellipse cx="77.5" cy="42" rx="7.5" ry="8.5" fill="#F4C2A1"/>
          
          {/* Hair - academic style */}
          <path d="M70,40 Q77.5,32 85,40 Q85,36 77.5,34 Q70,36 70,40 Z" fill="#654321"/>
          
          {/* Facial features - thoughtful expression */}
          <ellipse cx="74" cy="41" rx="1.2" ry="1.8" fill="#333"/>
          <ellipse cx="81" cy="41" rx="1.2" ry="1.8" fill="#333"/>
          <path d="M74,46 Q77.5,44 81,46" stroke="#D4736A" strokeWidth="1.2" fill="none"/>
          
          {/* Hand on chin - thinking pose */}
          <path d="M70,60 Q65,58 68,65" stroke="#8D6E63" strokeWidth="4" strokeLinecap="round"/>
          <ellipse cx="68" cy="67" rx="2.5" ry="2" fill="#F4C2A1"/>
          <path d="M68,67 Q72,45 74,42" stroke="#F4C2A1" strokeWidth="3" strokeLinecap="round"/>
        </g>
        
        {/* Research materials spread across desk */}
        <g>
          {/* Stack of academic books */}
          <rect x="25" y="75" width="18" height="4" fill="#1E88E5"/>
          <rect x="25" y="79" width="18" height="4" fill="#4CAF50"/>
          <rect x="25" y="83" width="18" height="4" fill="#FF9800"/>
          <rect x="25" y="87" width="18" height="4" fill="#9C27B0"/>
          
          {/* Open research papers */}
          <rect x="50" y="70" width="15" height="20" fill="white" stroke="#DDD" strokeWidth="1"/>
          <line x1="52" y1="73" x2="63" y2="73" stroke="#333" strokeWidth="0.5"/>
          <line x1="52" y1="76" x2="63" y2="76" stroke="#333" strokeWidth="0.5"/>
          <line x1="52" y1="79" x2="60" y2="79" stroke="#333" strokeWidth="0.5"/>
          <line x1="52" y1="82" x2="63" y2="82" stroke="#333" strokeWidth="0.5"/>
          <line x1="52" y1="85" x2="58" y2="85" stroke="#333" strokeWidth="0.5"/>
          
          {/* Laptop with research */}
          <rect x="95" y="75" width="22" height="15" fill="#2D3748" rx="2"/>
          <rect x="96" y="76" width="20" height="13" fill="#4A90E2"/>
          <rect x="103" y="91" width="6" height="2" fill="#666"/>
          <rect x="105" y="93" width="2" height="3" fill="#888" rx="1"/>
          
          {/* Research interface on laptop */}
          <rect x="98" y="78" width="16" height="2" fill="white"/>
          <rect x="98" y="81" width="12" height="1" fill="#E0E0E0"/>
          <rect x="98" y="83" width="14" height="1" fill="#E0E0E0"/>
          <rect x="98" y="85" width="10" height="1" fill="#E0E0E0"/>
        </g>
        
        {/* Academic inspiration/ideation elements */}
        <g>
          {/* Lightbulb - eureka moment */}
          <ellipse cx="77.5" cy="20" rx="6" ry="7" fill="#FFF59D" stroke="#FFD400" strokeWidth="2"/>
          <rect x="75" y="27" width="5" height="3" fill="#DDD"/>
          <line x1="71" y1="16" x2="68" y2="13" stroke="#FFD400" strokeWidth="2"/>
          <line x1="84" y1="16" x2="87" y2="13" stroke="#FFD400" strokeWidth="2"/>
          <line x1="77.5" y1="10" x2="77.5" y2="7" stroke="#FFD400" strokeWidth="2"/>
          <line x1="72" y1="24" x2="69" y2="27" stroke="#FFD400" strokeWidth="2"/>
          <line x1="83" y1="24" x2="86" y2="27" stroke="#FFD400" strokeWidth="2"/>
          
          {/* Research topic bubbles */}
          <circle cx="20" cy="35" r="10" fill="white" stroke="#4A90E2" strokeWidth="2"/>
          <text x="12" y="39" fill="#4A90E2" fontSize="7" fontWeight="bold">AI Ethics</text>
          
          <circle cx="140" cy="30" r="8" fill="white" stroke="#4CAF50" strokeWidth="2"/>
          <text x="132" y="34" fill="#4CAF50" fontSize="6" fontWeight="bold">Sustainability</text>
          
          <ellipse cx="130" cy="55" rx="12" ry="8" fill="white" stroke="#FF9800" strokeWidth="2"/>
          <text x="120" y="59" fill="#FF9800" fontSize="6" fontWeight="bold">UX Research</text>
        </g>
        
        {/* Connection lines showing ideation process */}
        <g opacity="0.6">
          <path d="M30,40 Q50,30 70,42" stroke="#4A90E2" strokeWidth="2" strokeDasharray="4,3" fill="none"/>
          <path d="M132,35 Q110,40 85,42" stroke="#4CAF50" strokeWidth="2" strokeDasharray="4,3" fill="none"/>
          <path d="M118,55 Q100,50 85,50" stroke="#FF9800" strokeWidth="2" strokeDasharray="4,3" fill="none"/>
        </g>
        
        {/* Academic tools */}
        <g>
          {/* Notebooks */}
          <rect x="125" y="78" width="8" height="12" fill="#8D6E63" rx="1"/>
          <rect x="134" y="80" width="8" height="10" fill="#5D4037" rx="1"/>
          
          {/* Research glasses */}
          <ellipse cx="12" cy="80" rx="3" ry="2" fill="none" stroke="#666" strokeWidth="1.5"/>
          <ellipse cx="18" cy="80" rx="3" ry="2" fill="none" stroke="#666" strokeWidth="1.5"/>
          <line x1="15" y1="80" x2="17" y2="80" stroke="#666" strokeWidth="1"/>
          
          {/* Coffee mug - academic fuel */}
          <ellipse cx="147" cy="82" rx="3" ry="2" fill="#8D6E63"/>
          <ellipse cx="147" cy="80" rx="2.5" ry="1.5" fill="#6D4C41"/>
          <path d="M150,81 Q152,81 152,83 Q152,85 150,85" stroke="#8D6E63" strokeWidth="1" fill="none"/>
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