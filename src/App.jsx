import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { format } from 'date-fns'

function App() {

  const [articles, setArticles] = useState([])
  const [sortBy, setSortBy] = useState('date-desc')
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    author: '',
    content: '',
    created_at: ''
  })

  // Pobieranie artykułów
  useEffect(() => {
    const fetchArticles = async () => {
      let query = supabase
        .from('articles')
        .select('*')

      if (sortBy === 'date-asc') query = query.order('created_at', { ascending: true })
      if (sortBy === 'date-desc') query = query.order('created_at', { ascending: false })
      if (sortBy === 'title') query = query.order('title', { ascending: true })

      const { data, error } = await query
      if (!error) setArticles(data)
    }
    
    fetchArticles()
  }, [sortBy])

  // Dodawanie nowego artykułu
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const { error } = await supabase
      .from('articles')
      .insert([{
        ...formData,
        created_at: new Date(formData.created_at).toISOString()
      }])

    if (!error) {
      setFormData({
        title: '',
        subtitle: '',
        author: '',
        content: '',
        created_at: ''
      })
      alert('Artykuł dodany!')
    }
  }

  return (
    <div className="App">
      {/* Sortowanie */}
      <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
        <option value="date-desc">Po dacie malejąco</option>
        <option value="date-asc">Po dacie rosnąco</option>
        <option value="title">Po nazwie alfabetycznie</option>
      </select>

      {/* Lista artykułów */}
      {articles.map(article => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <h3>{article.subtitle}</h3>
          <p>Autor: {article.author}</p>
          <p>Data: {format(new Date(article.created_at), 'dd-MM-yyyy')}</p>
          <p>{article.content}</p>
          <hr />
        </div>
      ))}

      {/* Formularz */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tytuł"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Podtytuł"
          value={formData.subtitle}
          onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
        />
        <input
          type="text"
          placeholder="Autor"
          value={formData.author}
          onChange={(e) => setFormData({...formData, author: e.target.value})}
          required
        />
        <textarea
          placeholder="Treść"
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          required
        />
        <input
          type="datetime-local"
          value={formData.created_at}
          onChange={(e) => setFormData({...formData, created_at: e.target.value})}
          required
        />
        <button type="submit">Dodaj artykuł</button>
      </form>
    </div>
  )
}

export default App

