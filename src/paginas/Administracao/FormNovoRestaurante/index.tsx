import { Box, Button, TextField, Typography, Container, AppBar, Toolbar, Link, Paper } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useParams, Link as LinkRouter } from "react-router-dom"
import { http } from "../../../http/http"

const FormNovoRestaurante = () => {

    const [nomeRestaurante, setNomeRestaurante] = useState('')
    const { id } = useParams()

    const criarNovoRestaurante = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        if(id) {
            http.put(`restaurantes/${id}/`, {
                nome: nomeRestaurante
            })
                .then((response) => alert('Restaurante atualizado com sucesso!'))
                .catch((error) => {
                    console.log(error)
                })
        }else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then((response) => alert(`Novo restaurante (${nomeRestaurante}) criado.`))
                .catch((response) => console.log(response))
        }
    }

    useEffect(() => {
        if(id) {
            http.get(`restaurantes/${id}/`)
                .then((response) => {
                    setNomeRestaurante(response.data.nome)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [])

    return (
        <Box component="form" onSubmit={criarNovoRestaurante}>
            <Typography component="h1" variant="h4" >
                Novo restaurante
            </Typography>
            <TextField 
                id="filled-basic" 
                label="Nome do restaurante" 
                variant="filled" 
                placeholder="Nome do restaurante"
                value={nomeRestaurante}
                onChange={e => setNomeRestaurante(e.target.value)}
                sx={{marginTop: 3}}
                fullWidth
            />
            <Button sx={{ marginTop: 3 }} type="submit" variant="contained" fullWidth>
                Salvar
            </Button>
        </Box>
    )
}

export default FormNovoRestaurante