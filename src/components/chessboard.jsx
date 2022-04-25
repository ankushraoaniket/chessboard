import { useEffect, useRef, useState } from "react"
import '../App.css';

const Chessboard = () => {

    let array = []

    for (let index = 0; index < 8; index++) {
        array.push(index);

    }

    const [state, setState] = useState({
        rows: JSON.parse(JSON.stringify(array)),
        columns: JSON.parse(JSON.stringify(array)),
        selectedSquareRowIndex: null,
        selectedSquareColIndex: null
    })

    const tableWrapper = useRef(null)

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside, false);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside, false);
        };
    }, [])

    const handleClickOutside = event => {
        if (tableWrapper.current && !tableWrapper.current.contains(event.target)) {
            setState(prevState => {
                return {
                    ...prevState,
                    selectedSquareRowIndex:null,
                    selectedSquareColIndex: null
                }
            })
        }
    }

    const squareClickHandler = (selectedSquareRowIndex, selectedSquareColIndex) => {
        setState(prevState => {
            return {
                ...prevState,
                selectedSquareRowIndex,
                selectedSquareColIndex
            }
        })
    }

    return <div className="main_div">
        <label>Chessboard</label>
        <div className="tbl" ref={tableWrapper}>
            {state.rows.map((row, rowIndex) => <tr key={"row" + rowIndex}>
                {state.columns.map((col, colIndex) => <td
                    key={"column" + colIndex}
                    style={{ backgroundColor: state.selectedSquareRowIndex === rowIndex && state.selectedSquareColIndex === colIndex ? "red" : "" }}
                    onClick={() => { squareClickHandler(rowIndex, colIndex) }}>
                </td>)}
            </tr>)}
        </div>
    </div>
}

export default Chessboard