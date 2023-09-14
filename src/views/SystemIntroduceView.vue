<template>
  <div id="introduceView">
    <a-typography :style="{ marginTop: '-40px' }">
      <a-typography-title> 答题规则</a-typography-title>
      <a-typography-paragraph>
        <pre>
        在做题页面选择好你的编译语言，将你的编写好的代码粘贴到代码框中，再点击“提交代码”即可。

        你的答案提交给系统后系统会自动对你的代码进行执行，你可以在提交记录页查看你提交的代码的状态，一般几秒钟后就可以看到判题的结果。
        
        <b style="font-weight: bold">请特别注意，Java的主类名必须是Main，提交的代码不能包含包名。</b>

        <b style="font-weight: bold;color: red">你需要从args获取测试数据的输入</b>
      </pre>

        <pre>
        <b style="font-weight: bold">例如：</b>
          import java.util.*;

          public class Main {
              public static void main(String args[]) {
                  System.out.println(a + b);
              }
          }
    </pre>
      </a-typography-paragraph>
    </a-typography>
  </div>
</template>
<style scoped>
#introduceView {
  margin: 0 auto;
  max-width: 1024px;
}
</style>
