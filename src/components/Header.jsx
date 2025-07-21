import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const { Option } = Select;

/**
 * 顶部导航栏
 */
export default function Header({ lang, onLangChange }) {
    const nav = useNavigate();
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    /* ---------- 三语菜单 ---------- */
    const menuItems = {
        en: [
            { key: '/',        label: 'Home'         },
            { key: '/info',    label: 'Information'  },
            { key: '/about',   label: 'About Us'     },
            { key: '/contact', label: 'Contact'      },
        ],
        'zh-Hans': [
            { key: '/',        label: '首页'       },
            { key: '/info',    label: '展览信息'   },
            { key: '/about',   label: '关于我们'   },
            { key: '/contact', label: '联系我们'   },
        ],
        'zh-Hant': [
            { key: '/',        label: '首頁'       },
            { key: '/info',    label: '展覽資訊'   },
            { key: '/about',   label: '關於我們'   },
            { key: '/contact', label: '聯絡我們'   },
        ],
    };

    /* ---------- 统一渲染函数 ---------- */
    const renderLinks = (isDrawer = false) =>
        menuItems[lang].map(({ key, label }) => (
            <li
                key={key}
                className={isDrawer ? '' : 'nav__link'}
                style={isDrawer ? { cursor: 'pointer' } : {}}
                onClick={() => {
                    nav(key);          // 跳转路由
                    if (isDrawer) setDrawerOpen(false);
                }}
            >
                <span
                    style={{
                        color: '#ffffff', /* 始终保持白色字体 */
                        fontWeight: 'bold', /* 加粗字体 */
                        fontSize: isDrawer ? '1.5rem' : '1rem', /* 调整字体大小 */
                    }}
                >
                    {label}
                </span>
            </li>
        ));

    return (
        <>
            {/* ===== 顶部条 ===== */}
            <div className="major-nav">
                {/* 仅保留后两个 Logo */}
                <nav className="nav-logo">
                    <img
                        src="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/UST-GZ-EN.png"
                        alt="HKUST GZ"
                    />
                    <div className="vertical" />
                    <img
                        src="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/UST-EN.png"
                        alt="HKUST"
                    />
                </nav>

                {/* 桌面导航 */}
                <nav className="nav">
                    <ul className="nav__links">
                        {renderLinks()}
                        <li className="nav__link">
                            <Select
                                className="language-select"
                                value={lang}
                                bordered={false}
                                onChange={onLangChange}
                                dropdownMatchSelectWidth={false}
                                style={{
                                    color: '#ffffff', /* 确保语言选择文字为白色 */
                                    fontSize: '1.1rem', /* 增大字体大小 */
                                }}
                            >
                                <Option value="en">English</Option>
                                <Option value="zh-Hans">简体中文</Option>
                                <Option value="zh-Hant">繁體中文</Option>
                            </Select>
                        </li>
                    </ul>
                </nav>

                {/* 移动端汉堡按钮 */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setDrawerOpen(true)}
                    aria-label="Menu"
                    style={{
                        color: '#ffffff',
                        fontSize: '2.5rem',  /* 增大字体 */
                        padding: '1rem',     /* 增加点击区域 */
                    }}
                >
                    <MenuOutlined />
                </button>
            </div>

            {/* ===== Drawer（移动端侧边栏） ===== */}
            <Drawer
                placement="right"
                closable
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
                bodyStyle={{ background: '#1f2029', padding: '1.2rem' }}
                headerStyle={{ display: 'none' }}
            >
                <ul style={{ /* 不变 */ }}>
                    {renderLinks(true)}
                    <li style={{ marginTop: '1rem' }}>
                        <Select
                            className="language-select"
                            value={lang}
                            onChange={(v) => {
                                onLangChange(v);
                                setDrawerOpen(false);
                            }}
                            style={{
                                color: '#ffffff',    // 控制已选中的文字颜色
                                fontSize: '1.5rem',  // 你已有的
                            }}
                            dropdownStyle={{
                                // 控制下拉框背景和文字
                                backgroundColor: '#1f2029',
                                color: '#ffffff',
                            }}
                            dropdownClassName="language-select-dropdown"
                        >
                            <Option value="en">English</Option>
                            <Option value="zh-Hans">简体中文</Option>
                            <Option value="zh-Hant">繁體中文</Option>
                        </Select>
                    </li>
                </ul>
            </Drawer>
        </>
    );
}
