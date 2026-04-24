import Navbar from "../../../components/viewer/Navbar";
import Footer from "../../../components/viewer/Footer";
import Header from "../../../components/viewer/Header";
import EmergencyCall from "../../../components/viewer/EmergencyCall";

import useTitle from "../../../hooks/useTitle";

const Informasi = () => {
    useTitle("Informasi");

    return (
        <div>
            <Navbar />
            <Header
                subtitle="Publikasi"
                title="Informasi"
                description="Informasi mengenai RSUD Bagas Waras Kabupaten Klaten."
            />
            <h1>Informasi</h1>
            <Footer />
            <EmergencyCall />
        </div>
    );
};

export default Informasi;