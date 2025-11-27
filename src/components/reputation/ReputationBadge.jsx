import './ReputationBadge.css'

const ReputationBadge = ({ score, count, showCount = true, size = 'medium' }) => {
  const stars = []
  const fullStars = Math.floor(score)
  const hasHalfStar = score % 1 >= 0.5

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>)
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<i key={i} className="bi bi-star-half text-warning"></i>)
    } else {
      stars.push(<i key={i} className="bi bi-star text-warning"></i>)
    }
  }

  const sizeClass = size === 'large' ? 'fs-4' : size === 'small' ? 'fs-6' : 'fs-5'

  return (
    <div className={`reputation-badge d-inline-flex align-items-center ${sizeClass}`}>
      <div className="stars me-2">{stars}</div>
      <span className="fw-bold me-1">{score}</span>
      {showCount && <span className="text-muted small">({count})</span>}
    </div>
  )
}

export default ReputationBadge
