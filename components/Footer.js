import Socials from "./Socials";

export default function Footer() {
    return (
        <footer>
            <div className="container grid-lg columns">
                <div className="column col col-sm-12"></div>
                <div className="column col col-sm-12">
                    <ul>
                        <li>Portfolio</li>
                        <li>Resume</li>
                        <li>Blog</li>
                    </ul>
                </div>
                <div className="column col col-sm-12 row socials">
                    {Socials().slice(1)}
                </div>
            </div>
        </footer>
    )
}