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
import IPrato from "../../../interfaces/IPrato"

const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get<IPrato[]>('pratos/')
            .then(response => {
                setPratos(response.data)
            })
            .catch(response => {
                console.log(response)
            })
    }, [])

    const deletePlate = (prato: IPrato) => {
        http.delete(`pratos/${prato.id}/`)
            .then((response) => {
                setPratos(pratos.filter((curPrato) => curPrato.id !== prato.id ? curPrato : false))
                alert(`${prato.nome} deletado com sucesso!`)
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
                                Tag:
                            </TableCell>
                            <TableCell>
                                Descrição:
                            </TableCell>
                            <TableCell>
                                Imagem:
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
                        {pratos.map(prato => (
                            <TableRow>
                                <TableCell>
                                    {prato.nome}
                                </TableCell>
                                <TableCell>
                                    {prato.tag}
                                </TableCell>
                                <TableCell>
                                    {prato.descricao}
                                </TableCell>
                                <TableCell>
                                    [<a rel="noreferrer" target="_blank" href={prato.imagem}>
                                        ver imagem
                                    </a>]
                                </TableCell>
                                <TableCell>
                                    [ <Link to={`/admin/pratos/${prato.id}`}>editar</Link> ]
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        variant="outlined" 
                                        color="error"
                                        onClick={() => deletePlate(prato)}
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

export default AdministracaoPratos