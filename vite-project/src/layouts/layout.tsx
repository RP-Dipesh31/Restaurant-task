import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";



type props ={
    children : React.ReactNode;
    showHero?:boolean;
}

const layout = ({children, showHero= false }:props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            {showHero && <Hero/>}
            <div className="container mx-auto flex-1 py-10">
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default layout;