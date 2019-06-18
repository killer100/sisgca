import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Confirm from '../_common/confirm';

class CertificacionListItemAction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openConfirm: false
        };
    }

    handleClickPdf = () => {
        window.open(
            `https://www.produce.gob.pe/produce/descarga/dispositivos-legales/${
            this.props.item.nombre_archivo
            }`
        );
    };

    handleOpenConfirm = () => {
        this.setState({ openConfirm: true });
    };

    handleCloseConfirm = () => {
        this.setState({ openConfirm: false });
    };

    handleConfirm = () => {
        this.props.onDelete(this.props.item.id_certificado_ambiental);
        this.handleCloseConfirm();
    };

    render() {
        const { openConfirm } = this.state;
        const { item, loading, onClickEditar } = this.props;
        return (
            <div>
                {item.nombre_archivo && (
                    <IconButton disabled={loading} title="Ver Pdf" onClick={this.handleClickPdf}>
                        <PictureAsPdfIcon />
                    </IconButton>
                )}

                <IconButton
                    disabled={loading}
                    title="Editar"
                    onClick={onClickEditar(item.id_certificado_ambiental)}
                >
                    <EditIcon />
                </IconButton>

                <IconButton disabled={loading} title="Eliminar" onClick={this.handleOpenConfirm}>
                    <DeleteIcon />
                </IconButton>

                <Confirm
                    onClose={this.handleCloseConfirm}
                    onConfirm={this.handleConfirm}
                    open={openConfirm}
                >
                    Se va a eliminar la certificación. ¿Continuar?
                </Confirm>
            </div>
        );
    }
}

export default CertificacionListItemAction;
