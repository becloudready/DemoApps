import React, { useState, useEffect } from 'react';

const WorldClock = () => {
    const [timeZones, setTimeZones] = useState({
        Toronto: { time: '', date: '', backgroundColor: '#8dcdba' }, // Light Blue
        Calgary: { time: '', date: '', backgroundColor: '#e6756f' }, // Light Pink
        SanJose: { time: '', date: '', backgroundColor: '#eee07a' }, // Light Green
        NewDelhi: { time: '', date: '', backgroundColor: '#4a257d' }  // Gold
        // Add more cities as needed
      });
      
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeZones = {
        Toronto: {
          ...timeZones.Toronto,
          time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'America/Toronto' }).format(new Date()),
          date: new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'America/Toronto' }).format(new Date()),
          name: 'Toronto'
        },
        Calgary: {
          ...timeZones.Calgary,
          time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'America/Edmonton' }).format(new Date()),
          date: new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'America/Edmonton' }).format(new Date()),
          name: 'Calgary'
        },
        SanJose: {
          ...timeZones.SanJose,
          time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'America/Los_Angeles' }).format(new Date()),
          date: new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'America/Los_Angeles' }).format(new Date()),
          name: 'San Jose'
        },
        NewDelhi: {
          ...timeZones.NewDelhi,
          time: new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date()),
          date: new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeZone: 'Asia/Kolkata' }).format(new Date()),
          name: 'New Delhi'
        }
      };
      setTimeZones(newTimeZones);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const renderTimeZone = (zone) => {
    return (
        <div className="time-zone" style={{ backgroundColor: zone.backgroundColor }}>
        <div className="city-name"><strong>{zone.name}</strong></div>
        
        <div>      {zone.time}</div>
        <div>      {zone.date}</div>
         
      </div>
    );
  };

  return (
    <div className="world-clock-container">
      {renderTimeZone(timeZones.Toronto)}
      {renderTimeZone(timeZones.Calgary)}
      {renderTimeZone(timeZones.SanJose)}
      {renderTimeZone(timeZones.NewDelhi)}
    </div>
  );
};

export default WorldClock;
