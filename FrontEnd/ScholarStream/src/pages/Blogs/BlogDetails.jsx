import { useParams, useNavigate } from "react-router";
import { blogData } from "../../data/blogData";
import Container from "../../components/shared/Container";
import Button from "../../components/shared/Button/Button";
import { FaArrowLeft, FaCalendarAlt, FaUser, FaTag } from "react-icons/fa";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogData.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <Container classes="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Blog Not Found</h2>
        <Button label="Back to Blogs" onClick={() => navigate("/blogs")} />
      </Container>
    );
  }

  return (
    <div className="bg-base-100 min-h-screen">
      {/* Hero Header */}
      <div className="relative h-[400px] w-full">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <Container classes="text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
              {blog.title}
            </h1>
          </Container>
        </div>
      </div>

      <Container classes="py-12 flex flex-col lg:flex-row gap-12">
        {/* Main Content Area */}
        <div className="lg:w-2/3">
          <div className="flex flex-wrap items-center gap-6 text-base-content/50 mb-8 pb-8 border-b border-base-300">
            <div className="flex items-center gap-2">
              <FaUser className="text-accent" />
              <span className="font-medium text-slate-800">{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-accent" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaTag className="text-accent" />
              <div className="flex gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-slate-100 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <article className="prose prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
            {blog.content}
          </article>

          <div className="mt-16 pt-8 border-t border-gray-100">
            <button
              onClick={() => navigate("/blogs")}
              className="btn btn-primary hover:bg-accent"
            >
              <FaArrowLeft />
              Back to All Blogs
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-slate-50 p-8 rounded-2xl sticky top-24">
            <h3 className="text-xl font-bold mb-4 text-primary">
              About ScholarStream
            </h3>
            <p className="text-base-content/70 mb-6 text-sm leading-relaxed">
              We are dedicated to helping students find the best educational
              opportunities globally. Our blog provides the tools and insights
              you need to succeed in your academic journey.
            </p>
            <div className="space-y-4">
              <button
                className="btn btn-accent text-white w-full border-none hover:opacity-90 transition-opacity"
                onClick={() => navigate("/all-scholarships")}
              >
                Browse Scholarships
              </button>
            </div>

            <h3 className="text-xl font-bold mt-10 mb-6 text-primary">
              Related Articles
            </h3>
            <div className="space-y-6">
              {blogData
                .filter((b) => b.id !== blog.id)
                .slice(0, 2)
                .map((item) => (
                  <div
                    key={item.id}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/blogs/${item.id}`)}
                  >
                    <p className="font-bold text-slate-800 group-hover:text-accent transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-base-content/50 mt-1">
                      {item.date}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlogDetails;
