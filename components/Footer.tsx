const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-blue-600 dark:bg-gray-800 text-white p-4 text-center">
            <p>© {currentYear} Security Shield PE. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;