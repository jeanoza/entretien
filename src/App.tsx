import React, { useEffect } from 'react';
import './App.css';
import InputField from './components/input-field';
import { getColors, updateColor } from './action';
import {styled} from "styled-components";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(50, auto);
  grid-template-rows: repeat(50, auto);
`

const FlexDiv = styled.div`
  display:flex;
`

export interface GridElement {
  user?: string;
  color?: string;
  coordinates?:string;
}

const TooltipWrapper = styled.div`
  position:absolute;
  top:0px;
  left:0px;
  z-index:10;
  width:fit-contents;
  white-space: nowrap;
  background-color:#777;
  color:white;
  padding:10px 20px;
`

interface GridProps extends GridElement{
  currentUser:string
  currentColor:string
  fetchData: () => void;
  clear: () => void;
}
interface DataType {
  [key: string]: GridElement;
}

function Grid(props:GridProps) {
  const {currentUser, currentColor, coordinates, clear, fetchData} = props;
  const [isHover, setIsHover] = React.useState<boolean>(false);
  function handleOnClick () {
    updateColor({color:currentColor, user:currentUser, coordinates:coordinates})
      .then(_ => fetchData());
  }
  return <div
    style={{width:'10px', height:'10px', border:'1px solid #eee', backgroundColor:`${props.color}`, position:'relative'}}
    onClick={handleOnClick}
    onMouseOver={() => setIsHover(true)}
    onMouseLeave={() => setIsHover(false)}
   >
    {(isHover && props.user && props.color) && <TooltipWrapper>{props.user}: {props.color} ({props.coordinates})</TooltipWrapper>}
   </div>
}

function App() {
  const [user, setUser] = React.useState<string>('');
  const [color, setColor] = React.useState<string>('');
  const [data, setData] = React.useState<DataType>(generateGrid());


  useEffect(() => {
    fetchData();
  }, [])

  function generateGrid() {
    let defaultGrid:DataType = {};
    for (let y = 0; y < 50; y++) {
      for (let x = 0; x < 50; x++) {
        defaultGrid[`${x}-${y}`] = {user:undefined, color:undefined, coordinates:`${x}-${y}`};
      }
    }
    return defaultGrid;
  }
  function fetchData() {
    getColors().then(res => {
      setData({...data, ...res})
    })
  }
  function clear () {
    setUser('');
    setColor('');
  }

  return (
    <div className="App">
      <div>
        <InputField name='User' value={user} setValue={setUser} />
        <InputField name='Color' value={color} setValue={setColor} />
      </div>
      <FlexDiv>
      <GridWrapper>
      {Object.entries(data).map((item) => {
        return <Grid
          key={item[0]}
          user={item[1].user}
          color={item[1].color}
          coordinates={item[0]}
          currentUser={user}
          currentColor={color}
          clear={clear}
          fetchData={fetchData}
          />
      })}
      </GridWrapper>
      </FlexDiv>
    </div>
  );
}

export default App;
