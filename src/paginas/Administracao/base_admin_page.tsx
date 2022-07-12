import { AppBar, Button, Container, Link, Paper, Toolbar, Typography } from "@mui/material"
import { Link as LinkRouter, Outlet } from "react-router-dom"

const BaseAdminPage = () => {
    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography component={"h1"} variant="h5">
                        Administração
                    </Typography>
                    <Container maxWidth="xl">
                        <Link component={LinkRouter} to="/admin/restaurantes/">
                            <Button sx={{ color: "white"}}>
                                Restaurantes
                            </Button>
                        </Link>
                        <Link component={LinkRouter} to="/admin/restaurantes/novo">
                            <Button sx={{ color: "white"}}>
                                Novo restaurante
                            </Button>
                        </Link>
                        <Link component={LinkRouter} to="/admin/pratos/">
                            <Button sx={{ color: "white"}}>
                                Pratos
                            </Button>
                        </Link>
                        <Link component={LinkRouter} to="/admin/pratos/novo">
                            <Button sx={{ color: "white"}}>
                                Novo prato
                            </Button>
                        </Link>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container sx={{ display: "flex", justifyContent: "center", flex: "column", alignItems: "center"  }} component="section">
                <Paper sx={{ p: 5, marginTop: 15 }} variant="outlined">
                    <Outlet/>
                </Paper>
            </Container>
        </>
    )
}

export default BaseAdminPage