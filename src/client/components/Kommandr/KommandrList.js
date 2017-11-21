import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import hdate from 'human-date';
import CodeMirror from 'react-codemirror';
import classNames from 'classnames';
import Humanize from 'humanize-plus';

import 'codemirror/addon/display/placeholder.js';
import 'codemirror/addon/display/autorefresh.js';
import 'codemirror/addon/mode/simple';
import 'codemirror/mode/shell/shell';

import { Stats, StatComment, StatView, StatFork, StatStar } from '../Stats';

const KommandrList = ({ data, compact }) => {
  const codemirrorOpts = {
    readOnly: true,
    lineNumbers: false,
    mode: "shell",
    autoRefresh: true,
    lineWrapping: true,
    height: 'auto',
    viewportMargin: Infinity,
  };
  const kommandrList = data.map((kommandr, idx) => {
    const itemClassnames = classNames({
      'kommandr-item': true,
      'compact': compact === true,
    });
    const cli = (compact) ? Humanize.truncate(kommandr.cli, 35) : kommandr.cli;
    return (
      <ListGroupItem key={kommandr.id} className={itemClassnames}>
      {!compact
        ? <h5><Link to={`/k/${kommandr.id}`}>{kommandr.title}</Link></h5>
        : <h6><Link to={`/k/${kommandr.id}`}>{kommandr.title}</Link></h6>
      }
        <CodeMirror defaultValue={cli} options={codemirrorOpts}/>
        <Stats>
          <StatView value={kommandr.totalViews} compact />
          <StatComment value={kommandr.totalComments} compact />
          <StatFork value={kommandr.totalForks} compact />
          <StatStar value={kommandr.totalStars} compact />
          <span>{hdate.relativeTime(kommandr.updatedAt)}</span>
        </Stats>
      </ListGroupItem>
    )
  });
  return (
    <ListGroup className="list-kommandrs">
      {kommandrList}
    </ListGroup>
  )
}

KommandrList.propTypes = {
  compact: PropTypes.bool,
  data: PropTypes.array,
};

export default KommandrList;
