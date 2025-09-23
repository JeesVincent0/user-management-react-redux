export const userLoginFormStyle = {
    mainContainer: `${center()} h-screen w-screen bg-black/10`,
    formContainer: `${center()} flex-col gap-7 h-[500px] w-[400px] bg-white shadow-2xl rounded-2xl`,
    heading: `text-2xl font-semibold`,
    inputField: `${buttonInputStyle("#7248B6")} bg-[#E8F0FE]`,
    buttonStyle: `${center()} ${buttonInputStyle("#7248B6")} cursor-pointer font-bold text-[#7248B6] hover:text-white hover:bg-[#7248B6]`,
    formStatus: `hover:underline cursor-pointer`,
}

function center(): string {
    return `relative flex justify-center items-center`
}

function buttonInputStyle(color: string): string {
    return `border-[${color}] border-2 rounded-sm h-10 w-70 p-3`
}