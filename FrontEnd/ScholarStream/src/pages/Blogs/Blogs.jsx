import { Link } from "react-router";
import { blogData } from "../../data/blogData";
import Container from "../../components/shared/Container";
import Button from "../../components/shared/Button/Button";
import { FaArrowRight, FaCalendarAlt, FaUser } from "react-icons/fa";

const Blogs = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            ScholarStream <span className="text-accent">Insights</span>
          </h1>
          <p className="text-base-content/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Stay updated with the latest scholarship trends, essay tips, and
            success stories from our global student community.
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((blog) => (
            <div
              key={blog.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 group flex flex-col h-full"
            >
              <figure className="relative overflow-hidden h-56">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge badge-accent text-white font-medium border-none px-3"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </figure>

              <div className="card-body p-6 flex flex-col grow">
                <div className="flex items-center gap-4 text-sm text-base-content/50 mb-3">
                  <div className="flex items-center gap-1">
                    <FaUser className="text-accent" /> {blog.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-accent" /> {blog.date}
                  </div>
                </div>

                <h2 className="card-title text-xl font-bold mb-3 text-slate-800 line-clamp-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h2>

                <p className="text-base-content/70 mb-6 line-clamp-3 leading-relaxed grow">
                  {blog.summary}
                </p>

                <div className="card-actions mt-auto">
                  <Link to={`/blogs/${blog.id}`} className="w-full">
                    <Button
                      label="Read Article"
                      full_Width={true}
                      icon={<FaArrowRight />}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Blogs;
