import { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import axiosInstance from '../utils/axiosInstance';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { jwtDecode } from 'jwt-decode';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

type GeolocationData = {
    data: any;
};

const containerStyle = {
    width: '90%',
    height: '90%'
};

const GeolocationInfo = () => {
    const [geoData, setGeoData] = useState<GeolocationData | null>(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const pdfRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedToken = localStorage.getItem('token');
            if (savedToken) {
                const decodedToken: any = jwtDecode(savedToken);
                setToken(decodedToken.ip_signup);
                fetchGeolocationInfo(decodedToken.ip_signup);
            }
        }
    }, []);

    const fetchGeolocationInfo = async (ip_signup: string) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/geolocation-info', { ip_signup });
            setGeoData({ data: response.data });
        } catch (error) {
            console.error('Error fetching geolocation data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExportPDF = async () => {
        if (pdfRef.current) {
            const canvas = await html2canvas(pdfRef.current);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190;
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 10;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('Geolocation_Info.pdf');
        }
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''
    })

    const coordinates = {
        lat: Number(geoData?.data?.latitude) ?? 0,
        lng: Number(geoData?.data?.longitude) ?? 0
    }

    return (
        <Layout>
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mt-12">
                <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-gray-200 mb-6">Información de Geolocalización 🌍</h2>

                {loading && (
                    <div className="flex items-center justify-center mt-6">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
                    </div>
                )}

                {geoData && (
                    <div ref={pdfRef} className="mt-10 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                        <div className="text-center mb-4">
                            <img src={geoData.data.country_flag} alt={`${geoData.data.country_name} Flag`} className="w-16 h-10 mx-auto" />
                            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200">{geoData.data.country_name} {geoData.data.country_emoji}</h3>
                            <p className="text-gray-600 dark:text-gray-400">IP: {geoData.data.ip}</p>
                        </div>

                        <div className="mt-4">
                            <p><strong>Ciudad:</strong> {geoData.data.city}</p>
                            <p><strong>Provincia/Estado:</strong> {geoData.data.state_prov}</p>
                            <p><strong>Capital:</strong> {geoData.data.country_capital}</p>
                            <p><strong>Moneda:</strong> {geoData.data.currency.name} ({geoData.data.currency.symbol})</p>
                            <p><strong>Hora Local:</strong> {geoData.data.time_zone.current_time}</p>
                        </div>

                        <div className="mt-6">
                            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Ubicación Geográfica 🌐</h4>
                            <div className="flex justify-center items-center h-[50vh] sm:h-[60vh] md:h-[70vh] mb-10">
                                {isLoaded ? (
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={coordinates}
                                        zoom={17}
                                    >
                                        <MarkerF
                                            key={'marker'}
                                            position={coordinates}
                                            draggable={true}
                                        />
                                    </GoogleMap>
                                ) : null
                                }
                            </div>
                        </div>

                        <button
                            onClick={handleExportPDF}
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
                        >
                            📄 Exportar a PDF
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default GeolocationInfo;
