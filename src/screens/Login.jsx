import React, { useState } from 'react'

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !senha) return
    onLoginSuccess()
  }

  return (
    <main>
      <h2>Login</h2>
      <p style={{ fontSize: '0.9rem' }}>
        A ideia é que cada pessoa da qualidade tenha seu acesso. Para fins de
        demonstração, a professora pode usar, por exemplo:
        <br />
        <strong>Usuário:</strong> prof.neila@fgv.br
        <br />
        <strong>Senha:</strong> fgv2025
      </p>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              display: 'block',
              width: '100%',
              padding: '6px 8px',
              marginTop: '4px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '8px' }}>
          Senha
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{
              display: 'block',
              width: '100%',
              padding: '6px 8px',
              marginTop: '4px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}
          />
        </label>

        <button type="submit">Entrar</button>
      </form>
    </main>
  )
}
