import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 bg-pattern bg-no-repeat bg-center">
      <h1 className="text-4xl font-bold">A página não foi encontrada.</h1>
      <p className="text-accent-foreground">
        Voltar ao{' '}
        <Link className="text-lime-500 dark:text-lime-400" to="/">
          início
        </Link>
        .
      </p>
    </div>
  )
}
