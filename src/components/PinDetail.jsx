import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
// Icons
import { MdDownloadForOffline } from 'react-icons/md'

import { client, urlFor } from '../client'
import MasonryLayout from './MasonryLayout'
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data'


function PinDetail({ user }) {

    return (
        <div>

            PinDetail
        </div>
    )
}

export default PinDetail
