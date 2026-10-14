import Text from '../atoms/Text';
import '../../styles/organisms/FaqSection.css';

const questions = [
  {
    id: 'delivery',
    question: '¿Cómo recibo mi producto digital después de comprar?',
    answer:
      'Una vez confirmado el pago, encontrarás los datos de entrega de tu producto en la sección de tu compra. Revisa también el correo asociado a tu cuenta.',
  },
  {
    id: 'activation',
    question: '¿Cómo activo una clave de juego o software?',
    answer:
      'Cada producto indica su plataforma y las instrucciones de activación. Comprueba esa información antes de comprar y sigue los pasos indicados para la plataforma correspondiente.',
  },
  {
    id: 'region',
    question: '¿Las claves funcionan en cualquier país?',
    answer:
      'No siempre. Algunas claves tienen restricciones regionales. Revisa la región y compatibilidad indicadas en la ficha del producto antes de completar tu compra.',
  },
  {
    id: 'payment',
    question: '¿Qué métodos de pago puedo utilizar?',
    answer:
      'Los métodos disponibles se muestran durante el proceso de compra. La disponibilidad puede variar según el país y el medio de pago.',
  },
  {
    id: 'key-problem',
    question: '¿Qué hago si tengo un problema con mi clave?',
    answer:
      'Contacta al equipo de soporte desde la sección de contacto e incluye el número de pedido y una descripción del problema. No compartas públicamente tu clave.',
  },
  {
    id: 'refund',
    question: '¿Puedo solicitar una devolución?',
    answer:
      'Las condiciones dependen del producto y de si la clave fue revelada o activada. Revisa la política de devoluciones y contacta a soporte si necesitas ayuda.',
  },
];

function FaqSection() {
  return (
    <section id="faq" className="faq-section" aria-label="Preguntas frecuentes de F4A">
      <div className="faq-content">
        <div className="faq-heading">
          <Text variant="p" className="faq-eyebrow">AYUDA F4A</Text>
          <Text variant="h2" className="faq-title">
            Preguntas frecuentes
          </Text>
          <Text className="faq-intro">
            Resuelve tus dudas sobre compras, claves digitales y activación.
          </Text>
        </div>

        <div className="faq-list">
          {questions.map(({ id, question, answer }) => (
            <details className="faq-item" key={id}>
              <summary className="faq-question">{question}</summary>
              <Text className="faq-answer">{answer}</Text>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
