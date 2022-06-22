import React, {memo} from "react";

export default memo(function TestComponent() {
  console.log('%cTestComponent', logStyle('black'));
  return <div>Test</div>
})