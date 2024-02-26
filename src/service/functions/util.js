export function handleUpLeft(index, arr, setGirl) {
    if (index === arr?.length - 1) {
        setGirl(0)
    } else {
        let value = index + 1
        setGirl(value)
    }
}

export function handleDownLeft(index, arr, setGirl) {
    if (index === 0) {
        setGirl(arr?.length - 1)
    } else {
        let value = index - 1
        setGirl(value)
    }
}