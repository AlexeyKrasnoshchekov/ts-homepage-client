import "./App.scss";
import { Weather } from "./components/weather/Weather";
import { Quote } from "./components/quote/Quote";
import { GoalInput } from "./components/goals/GoalInput";
import { GoalsList } from "./components/goals/GoalList";
import ImageContainer from "./components/image/ImageContainer";
import ImageDots from "./components/image/ImageDots";
import ImageArrowLeft from "./components/image/ImageArrowLeft";
import ImageArrowRight from "./components/image/ImageArrowRight";

function App() {
  return (
    <>
      <ImageContainer />

      <div className="container">
        <Weather />
        <Quote />
        <GoalInput />
        <GoalsList />
        <ImageDots />
        <ImageArrowLeft/>
        <ImageArrowRight/>
      </div>
    </>
  );
}

export default App;
