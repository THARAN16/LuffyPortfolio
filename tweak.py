import os
import re

base = r'd:\Career\Personals\Portfolio\src'
app_path = os.path.join(base, 'App.jsx')
css_path = os.path.join(base, 'index.css')

with open(app_path, 'r', encoding='utf-8') as f:
    app = f.read()

# 1. Remove section numbers
app = re.sub(r'<span className="section-number">.*?</span>\s*', '', app)

# 2. Change 4-bit ALU to FSM ASCII Display
app = app.replace('4-Bit ALU Design', 'FSM based ASCII Display')
app = app.replace(
    'Designed and verified a 4-bit Arithmetic Logic Unit in Verilog HDL supporting ADD, SUB, AND, OR, XOR, and NOT operations. Integrated carry and overflow detection logic. Validated all operation modes using comprehensive testbenches in Xilinx Vivado.',
    'Developed a Finite State Machine implemented in Verilog HDL to control and drive characters to an ASCII display. Features robust state transitions, debouncing logic, and precise timing control for character rendering on hardware.'
)
app = app.replace('<span>ALU</span>', '<span>FSM Design</span>')
app = app.replace('<span>Combinational Logic</span>', '<span>Digital Logic</span>')

# 3. Replace carousel wrapper in Contact section with contact-grid and swipe-to-flip
carousel_pattern = re.compile(r'<div className="carousel-wrapper" id="carouselWrapper">.*?</section>', re.DOTALL)

contact_grid_html = '''<div className="contact-grid">
                        {cards.map((card, i) => (
                            <div 
                                className={`flip-card ${flippedCards[card.id] ? 'flipped' : ''}`} 
                                id={`card-${card.id}`}
                                key={card.id}
                                onClick={(e) => toggleFlipCard(card.id, e)}
                                onTouchStart={(e) => {
                                    window.cardTouchX = e.touches[0].clientX;
                                }}
                                onTouchEnd={(e) => {
                                    if (window.cardTouchX && Math.abs(e.changedTouches[0].clientX - window.cardTouchX) > 30) {
                                        toggleFlipCard(card.id, e);
                                    }
                                }}
                            >
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <div className="flip-card-icon">
                                            {card.icon}
                                        </div>
                                        <h3>{card.title}</h3>
                                        <p className="flip-card-value">{card.value}</p>
                                        <span className="flip-hint">
                                            Tap or Swipe to reveal QR
                                        </span>
                                    </div>
                                    <div className="flip-card-back">
                                        <div className="flip-card-qr">
                                            <img 
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=080c14&bgcolor=f0f8ff&data=${encodeURIComponent(card.qrData)}`} 
                                                alt={`${card.title} QR Code`} 
                                                loading="lazy" 
                                            />
                                        </div>
                                        <h4>{card.backTitle}</h4>
                                        <p>{card.backDesc}</p>
                                        <span className="flip-back-hint">Tap or Swipe to flip back</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>'''

app = carousel_pattern.sub(contact_grid_html, app)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app)

# CSS Changes
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('width: 56px;\n    height: 56px;', 'width: 44px;\n    height: 44px;')
css = css.replace('width: 70px;\n    height: 70px;', 'width: 56px;\n    height: 56px;')

if '.contact-grid' not in css:
    css += '''
/* Contact Grid */
.contact-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
    perspective: 1500px;
}
@media (max-width: 992px) {
    .contact-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
    .contact-grid { grid-template-columns: 1fr; }
}
'''

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print("Updates completed successfully")
