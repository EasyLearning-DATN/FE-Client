import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-funny-wheels',
  templateUrl: './funny-wheels.component.html',
  styleUrls: ['./funny-wheels.component.css']
})
export class FunnyWheelsComponent implements OnInit{
  htmlContent: string = '';
  cssContent: string = '';
  js1Content: string = '';
  js2Content: string = '';
  js3Content: string = '';

  constructor(private http: HttpClient, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.http.get('assets/FunnyWheels/index.html', { responseType: 'text' })
      .subscribe(html => {
        this.htmlContent = html;
        this.executeJavaScript();
      });

    this.http.get('assets/FunnyWheels/allcss.css', { responseType: 'text' })
      .subscribe(css => this.cssContent = css);

      this.http.get('assets/FunnyWheels/alljs.js', { responseType: 'text' })
      .subscribe(js => this.js1Content = js);

    this.http.get('assets/FunnyWheels/d3.min.js', { responseType: 'text' })
      .subscribe(js => this.js2Content = js);

    this.http.get('assets/FunnyWheels/GameCustomAsset.js', { responseType: 'text' })
      .subscribe(js => this.js3Content = js);

      this.applyCss(this.cssContent);
  }

  executeJavaScript(): void {
    const script1 = this.renderer.createElement('script');
    script1.type = 'text/javascript';
    script1.text = this.js1Content;
    this.renderer.appendChild(document.body, script1);

    const script2 = this.renderer.createElement('script');
    script2.type = 'text/javascript';
    script2.text = this.js2Content;
    this.renderer.appendChild(document.body, script2);

    const script3 = this.renderer.createElement('script');
    script3.type = 'text/javascript';
    script3.text = this.js3Content;
    this.renderer.appendChild(document.body, script3);
  }

  applyCss(css: string): void {
    const style = this.renderer.createElement('style');
    style.textContent = css;
    this.renderer.appendChild(document.head, style);
  }
}
