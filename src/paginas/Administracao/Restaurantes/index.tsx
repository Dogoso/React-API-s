import { 
    Button,
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow 
} from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { http } from "../../../http/http"
import IRestaurante from "../../../interfaces/IRestaurante"

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>('restaurantes/')
            .then(response => {
                setRestaurantes(response.data)
            })
            .catch(response => {
                console.log(response)
            })
    }, [])

    const deleteRestaurant = (restaurante: IRestaurante) => {
        http.delete(`restaurantes/${restaurante.id}/`)
            .then((response) => {
                setRestaurantes(restaurantes.filter((curRestaurante) => curRestaurante.id !== restaurante.id ? curRestaurante : false))
                alert(`${restaurante.nome} deletado com sucesso!`)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <section>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Nome:
                            </TableCell>
                            <TableCell>
                                Editar:
                            </TableCell>
                            <TableCell>
                                Excluir:
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurantes.map(restaurante => (
                            <TableRow>
                                <TableCell>
                                    {restaurante.nome}
                                </TableCell>
                                <TableCell>
                                    [ <Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link> ]
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        variant="outlined" 
                                        color="error"
                                        onClick={() => deleteRestaurant(restaurante)}
                                    >
                                        EXCLUIR
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    )
}

export default AdministracaoRestaurantes