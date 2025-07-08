// src/pages/Contact.jsx
import React from 'react';

export default function Contact() {
    /* —— 当前位置坐标 —— */
    const lat = 22.887358;      // N
    const lon = 113.4822253;    // E

    /* 小范围包围盒：±0.01°，进入页面就能看到校园一带 */
    const bbox = [
        (lon - 0.01).toFixed(4),  // left
        (lat - 0.01).toFixed(4),  // bottom
        (lon + 0.01).toFixed(4),  // right
        (lat + 0.01).toFixed(4),  // top
    ].join(',');

    const osmSrc =
        `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}` +
        `&marker=${lat}%2C${lon}&layer=mapnik`;

    return (
        <section
            className="main-section"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 1.25rem',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '2rem',
                    maxWidth: 1080,
                    width: '100%',
                }}
            >
                {/* —— 联系信息 —— */}
                <div
                    style={{
                        flex: '1 1 380px',
                        minWidth: 320,
                        padding: '3rem 2.4rem',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 16,
                        backdropFilter: 'blur(6px)',
                        color: '#fff',
                        lineHeight: 1.85,
                        fontSize: '1.05rem',
                    }}
                >
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.4rem' }}>
                        Contact
                    </h2>

                    <p style={{ marginBottom: '1.2rem' }}>
                        HKUST(GZ) is located at No.&nbsp;1&nbsp;Duxue&nbsp;Road, Qingsheng Hub
                        Cluster, Nansha&nbsp;District, Guangzhou.
                        <br />
                        廣東省南沙區慶盛樞紐，篤學路一號，香港科技大學廣州
                    </p>

                    <p>
                        Email:&nbsp;
                        <a
                            href="mailto:mc2@hkust-gz.edu.cn"
                            style={{ color: '#00e0ff', textDecoration: 'underline' }}
                        >
                            mc2@hkust-gz.edu.cn
                        </a>
                    </p>
                </div>

                {/* —— 地图 —— */}
                <div
                    style={{
                        flex: '1 1 380px',
                        minWidth: 320,
                        borderRadius: 16,
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.12)',
                    }}
                >
                    <iframe
                        title="HKUST(GZ) Map"
                        width="100%"
                        height="400"
                        frameBorder="0"
                        scrolling="no"
                        src={osmSrc}
                        style={{ display: 'block' }}
                    />
                </div>
            </div>
        </section>
    );
}
