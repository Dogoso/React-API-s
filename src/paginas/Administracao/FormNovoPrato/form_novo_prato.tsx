import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { http } from "../../../http/http"
import IPrato from "../../../interfaces/IPrato"
import IRestaurante from "../../../interfaces/IRestaurante"
import ITag from "../../../interfaces/ITag"

const FormNovoPrato = () => {

    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tags, setTags] = useState<ITag[]>([])
    const [tag, setTag] = useState('')
    const [restaurante, setRestaurante] = useState('')
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [image, setImage] = useState<File | null>(null)
    const { id } = useParams()

    useEffect(() => {
        if(id) {
            http.get<IPrato>(`pratos/${id}/`)
                .then((response) => {
                    setNomePrato(response.data.nome)
                    setTag(response.data.tag)
                    setDescricao(response.data.descricao)
                    setRestaurante(String(response.data.restaurante))
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        http.get<{ tags: ITag[] }>(`tags/`)
            .then((response) => {
                setTags(response.data.tags)
            })
        http.get<IRestaurante[]>(`restaurantes/`)
            .then((response) => {
                setRestaurantes(response.data)
            })
    }, [])

    const criarNovoPrato = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('nome', nomePrato)
        formData.append('tag', tag)
        formData.append('descricao', descricao)
        formData.append('restaurante', restaurante)
        if(image) formData.append('imagem', image)
        http.request({
            url: `pratos/${id ? `${id}/` : ''}`,
            method: `${id ? "PUT" : "POST"}`,
            headers: {"Content-Type": "multipart/form-data"},
            data: formData,
        })
            .then((response) => {
                setNomePrato('')
                setTag('')
                setDescricao('')
                setRestaurante('')
                setImage(null)
                alert('Prato criado com sucesso!')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const setImageCorrectly = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files !== null) {
            setImage(e.target.files[0])
        }else {
            setImage(null)
        }
    }

    return (
        <Box component="form" onSubmit={criarNovoPrato}>
            <Typography component="h1" variant="h4" >
                Novo prato
            </Typography>
            <TextField 
                id="filled-basic" 
                label="Nome" 
                variant="filled" 
                placeholder="Nome"
                value={nomePrato}
                onChange={e => setNomePrato(e.target.value)}
                sx={{marginTop: 3}}
                fullWidth
            />
            <TextField 
                id="filled-basic" 
                label="Descrição" 
                variant="filled" 
                placeholder="Descrição"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                sx={{marginTop: 3}}
                fullWidth
            />
            <FormControl fullWidth sx={{marginTop: 3}}>
                <InputLabel>Tags</InputLabel>
                <Select value={tag} onChange={(e) => setTag(e.target.value)}>
                    {tags.map((tag) => (
                        <MenuItem value={tag.value}>
                            {tag.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{marginTop: 3, marginBottom: 3}}>
                <InputLabel>Restaurantes</InputLabel>
                <Select value={restaurante} onChange={(e) => setRestaurante(e.target.value)}>
                    {restaurantes.map((restaurante) => (
                        <MenuItem value={restaurante.id}>
                            {restaurante.nome}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <input type="file" onChange={setImageCorrectly} />
            <Button sx={{ marginTop: 3 }} type="submit" variant="contained" fullWidth>
                Salvar
            </Button>
        </Box>
    )
}

export default FormNovoPrato