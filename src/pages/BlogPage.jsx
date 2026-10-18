import { useNavigate } from 'react-router-dom';
import Text from '../components/atoms/Text';
import { blogService } from '../data/dbService';

function BlogPage() {
    const navigate = useNavigate();
    const blogs = blogService.getAll();

    return (
        <section className="route-page container my-5">
            <div className="text-center mb-5">
                <Text variant="p" className="page-eyebrow">
                    PUBLICACIONES Y NOVEDADES
                </Text>
                <Text variant="h1" className="page-title display-5 fw-bold">
                    Blog F4A
                </Text>
                <Text className="page-description text-secondary mx-auto">
                    Noticias, tutoriales de activación y novedades del mundo de los videojuegos y licencias digitales[cite: 3, 4].
                </Text>
            </div>

            <div className="row g-4">
                {blogs.length === 0 ? (
                    <div className="alert alert-info text-center" role="alert">
                        No hay publicaciones disponibles en este momento.
                    </div>
                ) : (
                    blogs.map((blog) => (
                        <div key={blog.id} className="col-12 col-md-4">
                            <div
                                className="blog-card h-100 p-0 overflow-hidden shadow"
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/blog/${blog.id}`)}
                            >
                                <img
                                    src={blog.imagen}
                                    alt={blog.titulo}
                                    className="w-100"
                                />
                                <div className="p-4 d-flex flex-column justify-content-between">
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="badge bg-secondary">{blog.categoria}</span>
                                            <small className="text-muted">{blog.fecha}</small>
                                        </div>
                                        <h5 className="fw-bold mb-3 text-white">{blog.titulo}</h5>
                                        <p className="card-custom-text mb-4">
                                            {blog.resumen}
                                        </p>
                                    </div>
                                    <span className="fw-bold text-decoration-none">
                                        Leer artículo completo →
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default BlogPage;
