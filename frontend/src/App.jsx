import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx';
import Home from "./pages/Home.jsx";
import RequestForm from "./pages/RequestForm";
import { containerClass } from "./utils/classes";

function App() {
    return (
        <Router>
            <Header />
            <main className={containerClass + " py-6"}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/open-request" element={<RequestForm key={location.pathname} />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
