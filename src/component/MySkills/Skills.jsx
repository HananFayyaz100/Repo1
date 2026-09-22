// import React from 'react'
// import './skills.css'
// import figma from './figma.png'
// import ps from './photo.jpeg'
// import ai from './ai3.jpeg'
// import ae from './af2.jpeg'
// import pr from './pr2.jpeg'
// import xd from './xd2.jpeg'
// function Skills() {
//   return (
//     <div>
//       <div className='outer_skill'>
//         <div className='inner_skill'>
//             <div className='first_part'>
//                 My Skills
//             </div>
//             <div className='second_part'>
//                 We put your ideas and thus your wishes in the form of unique web project that inspire and your customer
//             </div>
//             <div className='third_part'>
//                 <div className='each_skill'>
//                     <div className='first_part_of_each_skill'>
//                         <div className='inner-img'><img src={figma} alt="" /></div>
//                         <div className='percentage'>97%</div>
//                     </div>
//                     <div className='second_part_of_each_skill'>Figma</div>
//                 </div>
//                 <div className='each_skill'>
//                     <div className='first_part_of_each_skill'>
//                         <div className='inner-img'><img src={ps} alt="" /></div>
//                         <div className='percentage'>97%</div>
//                     </div>
//                     <div className='second_part_of_each_skill'>PhotoShop</div>
//                 </div>
//                 <div className='each_skill'>
//                     <div className='first_part_of_each_skill'>
//                         <div className='inner-img'><img src={ai} alt="" /></div>
//                         <div className='percentage'>96%</div>
//                     </div>
//                     <div className='second_part_of_each_skill'>Illustrator</div>
//                 </div>
//                 <div className='each_skill'>
//                     <div className='first_part_of_each_skill'>
//                         <div className='inner-img'><img src={ae} alt="" /></div>
//                         <div className='percentage'>95%</div>
//                     </div>
//                     <div className='second_part_of_each_skill'>After Effect</div>
//                 </div>
//                 <div className='each_skill'>
//                     <div className='first_part_of_each_skill'>
//                         <div className='inner-img'><img src={pr} alt="" /></div>
//                         <div className='percentage'>89%</div>
//                     </div>
//                     <div className='second_part_of_each_skill'>Premier Pro</div>
//                 </div>
//                 <div className='each_skill'>
//                     <div className='first_part_of_each_skill'>
//                         <div className='inner-img'><img src={xd} alt="" /></div>
//                         <div className='percentage'>96%</div>
//                     </div>
//                     <div className='second_part_of_each_skill'>XD</div>
//                 </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Skills


















import React, { useEffect, useState } from "react";
import "./skills.css";
import { getTools, getToolImageUrl } from "../../api/toolApi";

function Skills() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH TOOLS FROM BACKEND
  // =====================================================
  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTools();

        // Backend { success, data } bhejta hai — kayi shapes
        // safely handle kar rahe hain taake kabhi crash na ho
        const list = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.tools)
          ? data.tools
          : Array.isArray(data)
          ? data
          : [];

        setTools(list);
      } catch (err) {
        console.error("Skills fetch error:", err);
        setError("Skills abhi load nahi ho sakin.");
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  return (
    <div>
      <div className="outer_skill">
        <div className="inner_skill">

          <div className="first_part">
            My Skills
          </div>

          <div className="second_part">
            We put your ideas and thus your wishes in the form of unique web project that inspire and your customer
          </div>

          <div className="third_part">

            {loading ? (

              <p style={{ color: "inherit" }}>Loading skills...</p>

            ) : error ? (

              <p style={{ color: "inherit" }}>{error}</p>

            ) : tools.length === 0 ? (

              <p style={{ color: "inherit" }}>No skills added yet.</p>

            ) : (

              tools.map((tool) => (
                <div className="each_skill" key={tool._id || tool.id}>

                  <div className="first_part_of_each_skill">

                    <div className="inner-img">
                      {tool.image ? (
                        <img
                          src={getToolImageUrl(tool.image)}
                          alt={tool.name || "Tool"}
                          onError={(e) => {
                            e.currentTarget.style.visibility = "hidden";
                          }}
                        />
                      ) : null}
                    </div>

                    <div className="percentage">
                      {Number(tool.percentage) || 0}%
                    </div>

                  </div>

                  <div className="second_part_of_each_skill">
                    {tool.name || "Tool"}
                  </div>

                </div>
              ))

            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default Skills;
