import { useParams, useNavigate } from 'react-router-dom';
import Text from '../components/atoms/Text';
import { blogService } from '../services/dbService';

function BlogDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const blog = blogService.getById(id);

    if (!blog) {
        return (
            <div className="container my-5 text-center">
                <div className="alert alert-warning" role="alert">
                    El artículo del blog solicitado no existe.
                </div>
                <button
                    className="btn btn-outline-light mt-3"
                    onClick={() => navigate('/blog')}
                >
                    ← Volver a los artículos
                </button>
            </div>
        );
    }

    return (
        <section className="route-page container my-5">
            <button
                className="btn btn-link text-decoration-none mb-4 p-0 fw-bold"
                onClick={() => navigate('/blog')}
            >
                ← Volver al Blog
            </button>

            <div className="blog-card-detail">
                <div className="mb-4">
                    <span className="badge bg-secondary mb-2">{blog.categoria}</span>
                    <Text variant="h1" className="page-title h2 fw-bold text-white mb-2">
                        {blog.titulo}
                    </Text>
                    <div className="text-muted small">
                        <span>Por <strong>{blog.autor}</strong></span> | <span>{blog.fecha}</span>
                    </div>
                </div>

                <img
                    src={blog.imagen}
                    alt={blog.titulo}
                    className="img-fluid rounded mb-4 w-100 border border-secondary shadow"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                />

                <div className="card-custom-text">
                    {blog.contenido}
                </div>
            </div>
        </section>
    );
}

export default BlogDetailPage;
