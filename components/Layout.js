import Footer from './Footer'
import NavComponent from './NavComponent'
import NavMobile from './NavMobile'
export default function Layout({ children }) {
    return (
        <>
            <div className="xs:hidden sm:hidden lg:block sticky top-0 z-50">
                <NavComponent />
            </div>
            <main>{children}</main>
            <Footer />
            <div className="sm:hidden nav-bottom flex bottom-0 fixed border-top bg-gray-100 py-3 px-3 z-50">
                <NavMobile />
            </div>
        </>
    )
}