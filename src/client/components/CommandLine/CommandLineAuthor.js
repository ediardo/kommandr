import React from 'react';
import PropTypes from 'prop-types';
import hdate from 'human-date';
import CustomTooltip from '../CustomTooltip';

import { ProfileAvatar } from '../Profile';
import LinkUsername from '../LinkUsername';

const CommandLineTimestamps = ({ date }) => {
  return (
    <span className="kommandr-timestamps">
      Last updated <span id="lastUpdated">{hdate.relativeTime(date)}</span>
      <CustomTooltip content={hdate.prettyPrint(date, { showTime: true })} target="lastUpdated" placement="top" />
    </span>
  )
};

CommandLineTimestamps.propTypes = {
  date: PropTypes.string,
};

const CommandLineAuthor = ({ author, children, kommandr }) => {
  return (
    <div className="d-flex mt-3 pb-3 kommandr-author">
      <div className="author-avatar">
        <ProfileAvatar user={author} size="s" />
      </div>
      <div className="author-info ml-2">
        <LinkUsername user={author} />
        <div>
        {kommandr && <CommandLineTimestamps date={kommandr.updatedAt} />}
        </div>
        {children}
      </div>
      <div className="ml-auto">
        
      </div>
    </div>
  )
};

CommandLineAuthor.propTypes = {
  author: PropTypes.object,
  kommandr: PropTypes.object,
};

CommandLineAuthor.defaultProps = {
  kommandr: null,
  author: undefined,
}

export default CommandLineAuthor;
