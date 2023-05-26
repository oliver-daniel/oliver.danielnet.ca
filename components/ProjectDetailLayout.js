const ProjectDetailLayout = ({id, children}) => {
    const pageProps = {
        id,
    }
    return (
        <main {...pageProps} className="page project-detail">
            {children}
        </main>
    )
}

export default ProjectDetailLayout;