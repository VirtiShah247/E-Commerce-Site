import PropTypes from "prop-types";
import { Fragment } from "react";
import { Button } from "./Button";
import { Container } from "./Container";

export const Accordion = ({title, Icon, titleClassName, children, open, onClick}) => {
    return (
    <Fragment>
        <Container>
            <Button color="baseColor" className={`grid grid-cols-2 items-center ${titleClassName}`} onClick={onClick}>
                <p className="justify-self-start">{title}</p>
                {Icon && <Icon size="25" className="justify-self-end"/>}
            </Button>
            {
                open &&
                <div>{children}</div>
            }
        </Container>
    </Fragment>
  )
}
Accordion.propTypes = {
    title: PropTypes.node.isRequired,
    description: PropTypes.node.isRequired,
    Icon: PropTypes.element.isRequired,
    className: PropTypes.node.isRequired,
    titleClassName: PropTypes.node.isRequired,
    open: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}