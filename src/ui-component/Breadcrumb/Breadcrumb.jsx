import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../constants/routes";

const Breadcrumb = ({ title }) => {
  return (
    <div className="breadcrumb py-26 bg-main-two-50">
      <div className="container container-lg">
        <div className="breadcrumb-wrapper flex-between flex-wrap gap-16">
          <h6 className="mb-0">{title}</h6>
          <ul className="flex-align gap-8 flex-wrap">
            <li className="text-sm">
              <Link
                to={ROUTE_PATH.HOME}
                className="text-gray-900 flex-align gap-8 hover-text-main-600"
              >
                <i className="ph ph-house" />
                Trang chủ
              </Link>
            </li>
            <li className="flex-align">
              <i className="ph ph-caret-right" />
            </li>
            <li className="text-sm text-main-600"> {title} </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

Breadcrumb.propTypes = {
  title: PropTypes.string,
};

export default Breadcrumb;
