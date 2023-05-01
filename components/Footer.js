import Socials from "./Socials";

export default function Footer() {
    return (
        <footer>
            <div className="container grid">
                <div className=""></div>
                <div className="test">
                    <ul>
                        <li>Portfolio</li>
                        <li>Resume</li>
                        <li>Blog</li>
                    </ul>
                </div>
                <div className="row socials">
                    {Socials().slice(1)}
                </div>
            </div>
        </footer>
    )
}