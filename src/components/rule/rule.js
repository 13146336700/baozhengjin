import React from 'react';
import "./rule.scss";


function App1() {
  return (
    <div className="ruleHome">
      <h3 className="ruleTitle">《保证金及处罚规则》</h3>
      <div className="rulecontent">
      基于邮宝平台部分用户存在发布信息不合规、交易过程不规范等行为，邮宝平台特发行此《保证金及处罚规则》，意在规范用户操作，提高平台的安全度与可信度。 
      </div>
      <br/><br/>
      <div className="rulecontent">
        一、根据用户的违规现象<br/>
        1、邮宝平台按照用户的的违规程度做出违规类型分类，将按照不同类型的违规行为做出相应的限时功能限制处罚；<br/>
       2、缴纳保证金作为信用担保可提前解除功能限制处罚；<br/>
3、再次违规会根据您的处罚类型在保证金中扣除一部分处罚金作为违规处罚；<br/>
4、再次违规邮宝有权在剩余保证金中扣除处罚金；<br/>
5、此处罚金一经扣除不再退还；<br/>
6、如多次违规，则功能限制不自动解除，需缴纳保证金解除限制。
	  </div>
    <br/><br/>
      <div className="rulecontent">
      二、邮宝平台违规类型、描述及对应保证金缴纳与处罚金额如下：<br/>
       <img src="http://image.ybk008.com/baozhengjinguize1579239449828"/>
      </div>
      <div className="rulecontent">
        三、用户账号剩余保证金可在用户注销邮宝账号时退还。
	    </div><br/><br/>
      <div className="rulecontent">
       四.最终解释权归邮宝所有。
	    </div>
    </div>
  );
}

export default App1;
