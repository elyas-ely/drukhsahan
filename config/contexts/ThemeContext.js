import React, { createContext, useState, useEffect, useContext } from "react"

const themeConfig = {
  Light: {
    primaryText: "#20202B",
    secondaryText: "#7A7D85",
    placeHolderText: "#A39E9E",
    primary: "#1DBF73",
    lightPrimary: "#E5F6EE",
    darkPrimary: "#A9E6C9",
    background: "#F9F9F9",
    secondaryBackground: "#FFFFFF",
    disabbled: "#DFE3E2",
    star: "#FFB33E",
    secondaryInput: "#F8F8F8",
    primaryInput: "#F2F2F2",
    icon: "#20202B",
    borderColor: "#ECECEC",
    secondaryBorder: "#F6F6F6",
    selectedBackground: "#DDDDDD",

    cardImage: "#F8F8F8",
    buttonText: "#ffff",
    shadowColor: "#c7c7c7",
  },

  Dark: {
    primaryText: "#fff",
    secondaryText: "#C9C9C9",
    placeHolderText: "#878787",
    primary: "#1dbf73",
    lightPrimary: "#3A4D44",
    darkPrimary: "#A9E6C9",
    background: "#1D1D1D",
    secondaryBackground: "#242628",
    disabbled: "#434546",
    star: "#FFB33E",
    secondaryInput: "#434546",
    primaryInput: "#434546",
    icon: "#fff",
    borderColor: "#303338",
    secondaryBorder: "#242628",
    selectedBackground: "gray",
    cardImage: "#F8F8F8",
    buttonText: "#ffff",
    shadowColor: "#1D1D1D",
  },
}

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState("Light")
  const [colors, setColors] = useState(themeConfig.Light)
  const [themeLoading, setThemeLoading] = useState(null)

  const changeTheme = (themeName) => {
    setThemeLoading(true)
    if (themeConfig[themeName]) {
      setActiveTheme(themeName)
      setColors(themeConfig[themeName])
    }
    setThemeLoading(false)
  }

  return (
    <ThemeContext.Provider value={{ colors, activeTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
