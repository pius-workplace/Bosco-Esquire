import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="min-h-[80vh] grid place-items-center text-center px-6 pt-28">
      <div><div className="display-xl text-amber">404</div><p className="display-m mt-4">This jar is empty.</p><Link to="/shop" className="btn btn-dark mt-8">Back to the shop</Link></div>
    </div>
  )
}
