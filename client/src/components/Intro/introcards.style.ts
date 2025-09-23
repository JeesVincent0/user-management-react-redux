export const introStyle = {
    mainCard: `${commonStyle}`,
    headingDiv: `${commonStyle}  relative p-9 bg-white shadow-2xl rounded-2xl border-l-[#7248B6] border-t-[#7248B6] border-b-[#61DBFB] border-r-[#61DBFB] border-3`,
    heading: "text-5xl font-semibold",

    // react and redux icon container
    reactReduxCard: "flex justify-between items-center relative mx-auto mt-7 w-90",
    reactText: iconTextStyle("#61DBFB"),
    reduxText: iconTextStyle("#7248B6"),
    andText: "text-4xl text-black",
    icon: "h-10 w-10",

    // Admin and user button container
    buttonMainContainer: `flex items-center justify-center gap-7 mt-10`,
    buttonAdmin: "p-3 w-50 flex justify-center hover:bg-[#7248B6] border-[#7248B6] text-[#7248B6] hover:text-white cursor-pointer border-2 bg-white font-semibold rounded-xl shadow-2xl",
    buttonUser: "p-3 w-50 flex justify-center hover:bg-[#61DBFB] border-[#61DBFB] text-[#61DBFB] hover:text-white cursor-pointer border-2 bg-white font-semibold rounded-xl shadow-2xl"


}

function commonStyle(): string {
    return `flex items-center justify-center flex-col`
}

function iconTextStyle(color: string): string {
    return `text-4xl text-[${color}] font-semibold`
}