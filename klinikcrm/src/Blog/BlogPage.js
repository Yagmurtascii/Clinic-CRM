function BlogPage({selectedPost}) {
    return (
        <>
            {selectedPost && (
                <div className="m-5 p-5 ">
                    <p dangerouslySetInnerHTML={{__html: selectedPost.content}}/>
                </div>
            )}
        </>
    )

}

export default BlogPage;
