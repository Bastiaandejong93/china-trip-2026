export const theme = {
  // Warm Chinese Cultural Color Palette (New Design System)
  colors: {
    // Primary Palette
    imperialRed: "#B52719",    // Primary action / route highlights
    warmGold: "#D8B45A",       // Highlights / progress / icons
    sealRed: "#9A1E23",        // Stamps / labels
    inkBlack: "#060708",       // Main background
    mistInk: "#1A1B1F",        // Cards / Nav background
    ricePaper: "#F3E7D6",      // Sections with "parchment" feel
    cloudGrey: "#E0D7C9",      // Borders / hairlines
    pineGreen: "#57786A",      // Nature elements
    riverTeal: "#4C8C86",      // Rivers / route lines

    // Extended palette for cultural depth (Legacy/Compat)
    terracotta: "#D87D4A",
    jadeInkBlue: "#4A6D7C",
    goldenLantern: "#F2C94C",
    warmBeige: "#E3D5CA",
    ricePaperWhite: "#F5F5F5",
    deepCrimson: "#8B0000",
    forestGreen: "#556B2F",
    celadon: "#ACE1AF",
    mistGray: "#B8C5C6",
    dawnOrange: "#FF8C42",
    twilightPurple: "#6B46C1",

    // UI Colors (Mapped to new palette where appropriate)
    background: "#060708", // inkBlack
    surface: "#1A1B1F",    // mistInk
    text: "#F3E7D6",       // ricePaper
    textSecondary: "#E0D7C9", // cloudGrey
    accent: "#B52719",     // imperialRed
    accentSecondary: "#D8B45A", // warmGold
    accentHighlight: "#D8B45A", // warmGold
    border: "rgba(224, 215, 201, 0.2)", // cloudGrey with transparency
    shadow: "rgba(6, 7, 8, 0.5)", // inkBlack shadow

    // Backwards compatibility aliases
    accentBlue: "#4C8C86", // riverTeal
    accentGold: "#D8B45A", // warmGold
    accentRed: "#B52719", // imperialRed
    grey: "#E0D7C9", // cloudGrey

    // Gradient definitions
    gradients: {
      sunset: "linear-gradient(135deg, #FF8C42 0%, #D87D4A 50%, #8B0000 100%)",
      mountainMist: "linear-gradient(180deg, #1A1B1F 0%, #060708 100%)", // Updated for dark mode
      jadeGlow: "radial-gradient(circle, #57786A 0%, #1A1B1F 100%)", // Updated
      lanternGlow: "radial-gradient(ellipse, #D8B45A 0%, rgba(216, 180, 90, 0) 70%)", // Updated
      inkSpread: "radial-gradient(ellipse, #060708 0%, rgba(6, 7, 8, 0) 60%)", // Updated
      watercolorBleed: "radial-gradient(circle, #F3E7D6 0%, rgba(243, 231, 214, 0.3) 100%)"
    }
  },

  // Cultural Typography System
  fontSizes: {
    heading: {
      hero: "4.5rem",        // Main cinematic titles
      h1: "3.5rem",          // Section titles
      h2: "2.5rem",          // Subsection titles
      h3: "1.875rem",        // Card titles
      h4: "1.5rem",          // Small headings
      h5: "1.25rem"          // Caption headings
    },
    body: {
      large: "1.125rem",       // Lead text
      base: "1rem",            // Body text
      small: "0.875rem",        // Caption text
      xs: "0.75rem"            // Fine print
    },
    display: {
      serif: "'Cormorant Garamond', 'Playfair Display', serif", // Updated
      sans: "'Inter', 'Lato', sans-serif",    // Updated
      chinese: "'Noto Sans SC', 'PingFang SC', sans-serif"
    }
  },

  // Font Display Alias (for backward compatibility)
  fontDisplay: {
    serif: "'Cormorant Garamond', 'Playfair Display', serif",
    sans: "'Inter', 'Lato', sans-serif",
    chinese: "'Noto Sans SC', 'PingFang SC', sans-serif"
  },

  // Cultural Spacing System
  spacing: {
    xs: "0.25rem",     // 4px
    sm: "0.5rem",      // 8px
    md: "1rem",         // 16px
    lg: "1.5rem",       // 24px
    xl: "2rem",         // 32px
    xxl: "3rem",        // 48px
    xxxl: "4rem",       // 64px

    // Cultural spacing
    brushStroke: "0.125rem",   // 2px - brush stroke width
    inkBleed: "0.25rem",     // 4px - ink bleed effect
    lanternGlow: "0.5rem",     // 8px - lantern glow radius
    sealStamp: "0.75rem",     // 12px - seal stamp size
    paperMargin: "2rem",       // 32px - traditional paper margin
  },

  // Cultural Border Radius
  borderRadius: {
    none: "0",
    sm: "0.125rem",    // 2px - subtle corners
    md: "0.25rem",     // 4px - standard corners
    lg: "0.5rem",      // 8px - rounded elements
    xl: "0.75rem",     // 12px - cards
    full: "9999px",     // Circular elements
    scroll: "0.5rem",     // 8px - scroll bars

    // Cultural shapes
    brush: "0.125rem 0.5rem",     // Brush stroke corners
    lantern: "50% 50% 0.5rem 0.5rem", // Lantern shape
    seal: "0.125rem",             // Seal stamp corners
    paper: "0.25rem",              // Paper edge corners
  },

  // Cultural Shadows
  shadows: {
    ink: "0 2px 8px rgba(6, 7, 8, 0.5)",      // Soft ink shadow (Darker)
    brush: "0 4px 16px rgba(181, 39, 25, 0.2)",     // Brush stroke shadow (Red tint)
    lantern: "0 0 20px rgba(216, 180, 90, 0.3)",    // Lantern glow (Gold tint)
    seal: "0 2px 4px rgba(154, 30, 35, 0.3)",        // Seal stamp shadow
    paper: "0 1px 3px rgba(224, 215, 201, 0.1)",     // Paper depth
    mountain: "0 8px 32px rgba(26, 27, 31, 0.5)",  // Mountain mist
    watercolor: "0 6px 24px rgba(76, 140, 134, 0.15)", // Watercolor bleed
  },

  // Cultural Motion System
  motion: {
    // Base animations
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.8, ease: "easeOut" }
    },
    slideUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    slideDown: {
      initial: { opacity: 0, y: -30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }
    },

    // Cultural animations
    inkSpread: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 0.8 },
      transition: {
        duration: 2.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2
      }
    },
    brushStroke: {
      initial: { pathLength: 0, opacity: 0 },
      animate: { pathLength: 1, opacity: 0.9 },
      transition: {
        duration: 3,
        ease: "easeInOut",
        delay: 0.5
      }
    },
    lanternGlow: {
      initial: { scale: 0.9, opacity: 0 },
      animate: {
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8],
        filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
      },
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 2
      }
    },
    sealStamp: {
      initial: { scale: 0, rotate: -15 },
      animate: { scale: 1, rotate: 0 },
      transition: {
        duration: 0.6,
        ease: [0.68, -0.55, 0.265, 1.55],
        delay: 0.3
      }
    },
    watercolorBleed: {
      initial: { scale: 0.95, opacity: 0.7 },
      animate: { scale: 1, opacity: 1 },
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.1
      }
    },
    mountainParallax: {
      initial: { y: 0 },
      animate: { y: -50 },
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 0
      }
    },

    // Scroll-triggered animations
    scrollReveal: {
      initial: { opacity: 0, y: 50, scale: 0.95 },
      whileInView: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    inkWrite: {
      initial: { pathLength: 0 },
      whileInView: { pathLength: 1 },
      transition: {
        duration: 2,
        ease: "easeInOut",
        delay: 0.3
      }
    },

    // Map animations
    mapPan: {
      duration: 2.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    },
    mapZoom: {
      duration: 1.8,
      ease: "easeInOut"
    },
    routeDraw: {
      duration: 3,
      ease: "easeInOut",
      delay: 0.5
    }
  },

  // Breakpoints
  breakpoints: {
    mobile: "640px",
    tablet: "768px",
    desktop: "1024px",
    large: "1280px",
    xlarge: "1536px"
  },

  // Z-index system
  zIndex: {
    base: 0,
    background: 1,
    paper: 2,
    content: 3,
    lantern: 4,
    seal: 5,
    overlay: 10,
    modal: 20,
    map: 30,
    navigation: 40,
    tooltip: 50
  },

  // Cultural Effects
  effects: {
    inkTexture: {
      filter: "contrast(1.05) brightness(1.02)",
      mixBlendMode: "multiply",
      opacity: 0.9
    },
    watercolorTexture: {
      filter: "contrast(0.95) saturate(1.1)",
      mixBlendMode: "soft-light",
      opacity: 0.85
    },
    lanternGlow: {
      filter: "blur(8px) brightness(1.3)",
      mixBlendMode: "screen",
      opacity: 0.6
    },
    paperTexture: {
      filter: "contrast(0.98) brightness(1.05)",
      mixBlendMode: "normal",
      opacity: 1
    },
    sealTexture: {
      filter: "contrast(1.2) saturate(0.8)",
      mixBlendMode: "multiply",
      opacity: 0.9
    }
  },

  // Typography settings
  typography: {
    fontFamily: {
      display: "'Cormorant Garamond', 'Playfair Display', serif",
      body: "'Inter', 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      chinese: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
      poetic: 1.8
    },
    letterSpacing: {
      tight: "-0.02em",
      normal: "0",
      relaxed: "0.04em",
      poetic: "0.08em"
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900
    }
  }
}

export type Theme = typeof theme

export default theme