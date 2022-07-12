import axios from 'axios';
import React, { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import IRestantesInfo from '../../interfaces/IRestaurantesInfo';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [filteredRestaurantes, setFilteredRestaurantes] = useState<IRestaurante[]>([])
  const [amountButtons, setAmountButtons] = useState<number[] | never[]>([]);
  const [curPage, setCurPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false)
  const [searchType, setSearchType] = useState("Nome")

  useEffect(() => {
    getCurPageRestaurants()
  }, [curPage])

  const getCurPageRestaurants = () => {
    axios.get<IRestantesInfo<IRestaurante>>(`http://localhost:8000/api/v1/restaurantes/?page=${curPage}`)
    .then(response => {
      setRestaurantes(response.data.results)
      setFilteredRestaurantes(response.data.results)
      let newArrayButtons = []
      let maxPage = Math.ceil(response.data.count / 6).toFixed(0)
      for(let i = 1; i <= Number(maxPage); i++) {
        newArrayButtons.push(i)
      }
      setAmountButtons(newArrayButtons)
    })
    .catch(response => console.log(response))
  }

  const buscarRestaurantes = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(search) {
      if(searchType === "Nome") {
        setFilteredRestaurantes(restaurantes.filter((restaurante) => restaurante.nome.indexOf(search) !== -1 ? restaurante : false))
      }else {
        setFilteredRestaurantes(restaurantes.filter((restaurante) => restaurante.id === Number(search) ? restaurante : false))
      }
      setSearched(true)
    }else {
      alert('A busca está vazia!')
    }
  }

  const resetRestaurantes = () => {
    setSearch("")
    setSearched(false)
    setFilteredRestaurantes([...restaurantes])
  }

  return (
    <section className={style.ListaRestaurantes}>
      {searched && <button className={style.back} onClick={() => resetRestaurantes()}>
        &lt;- Voltar
      </button>}
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      <form onSubmit={buscarRestaurantes}>
        <div>
          <input 
            type="text" 
            className={style["search-bar"]}
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <select 
            className={style["search-type"]}
            name="select_search" 
            id="select_search" 
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="Nome">Nome</option>
            <option value="ID">ID</option>
          </select>
        </div>
        <div>
          <button 
            className={style.back}
            type='submit'
          >
            Buscar
          </button>
        </div>
      </form>
      {filteredRestaurantes?.map(item => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {!searched && amountButtons.map((cur) => ( 
        <button className={style.buttons} onClick={() => setCurPage(cur)}>
          {cur}
        </button> 
      ))}
    </section>
  )
}

export default ListaRestaurantes