import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { JSX, SVGProps } from "react";
import Image from "next/image";

export function Chatui() {
  return (
    <div className="grid md:grid-cols-[400px_1fr] min-h-screen w-full">
      <div className="flex flex-col bg-background text-foreground p-6 gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">AI Page Builder</h1>
          <Button>New Page</Button>
        </div>
        <div className="flex flex-col gap-4 overflow-auto">
          <div className="flex items-start gap-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="font-medium">You</div>
              <div className="prose text-muted-foreground">
                <p>
                  Hi there! Id like to create a new landing page for my company.
                  Can you help me with that?
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="font-medium">AI Assistant</div>
              <div className="prose text-muted-foreground">
                <p>
                  Absolutely! Id be happy to help you create a new landing page.
                  What kind of content or features would you like to include?
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="font-medium">You</div>
              <div className="prose text-muted-foreground">
                <p>
                  Id like to have a hero section with a catchy headline, a brief
                  description, and two call-to-action buttons. Then maybe a
                  features section with a grid of 3-4 features, and a footer
                  with some links.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="font-medium">AI Assistant</div>
              <div className="prose text-muted-foreground">
                <p>
                  Sounds good! Let me get started on that for you. Ill create a
                  responsive landing page design with a hero section, a features
                  grid, and a footer. Please give me a few minutes to put
                  together a draft for you to review.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <Textarea
            placeholder="Send a message..."
            className="pr-16 rounded-2xl"
          />
          <Button type="submit" size="icon" className="absolute top-3 right-3">
            <ArrowUpIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-muted p-6">
        <div className="max-w-6xl w-full">
          <h2 className="text-2xl font-bold mb-6">
            Preview of the Generated Page
          </h2>
          <section className="w-full pt-12 md:pt-24 lg:pt-32">
            <div className="container space-y-10 xl:space-y-16">
              <div className="grid gap-4 px-10 md:grid-cols-2 md:gap-16">
                <div>
                  <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                    Create a Beautiful Landing Page
                  </h1>
                </div>
                <div className="flex flex-col items-start space-y-4">
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Easily build and customize a high-converting landing page
                    for your business.
                  </p>
                  <div className="space-x-4">
                    <Button>Get Started</Button>
                    <Button variant="secondary">Learn More</Button>
                  </div>
                </div>
              </div>
              <Image
                src="/placeholder.svg"
                width="1270"
                height="300"
                alt="Hero"
                className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover"
              />
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Drag-and-Drop Builder</h3>
                <p className="text-sm text-muted-foreground">
                  Easily customize your landing page with our intuitive
                  drag-and-drop interface.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Responsive Design</h3>
                <p className="text-sm text-muted-foreground">
                  Your landing page will look great on any device, from desktop
                  to mobile.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Analytics & Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your landing page performance with built-in analytics
                  and tracking.
                </p>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Ready to Get Started?
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Create a high-converting landing page for your business in
                    minutes with our AI-powered builder.
                  </p>
                </div>
                <Button>Start Building</Button>
              </div>
            </div>
          </section>
          <footer className="w-full py-6 border-t">
            <div className="container flex items-center justify-between px-4 md:px-6">
              <p className="text-sm text-muted-foreground">
                &copy; 2024 AI Page Builder. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-sm hover:underline"
                  prefetch={false}
                >
                  Terms
                </Link>
                <Link
                  href="#"
                  className="text-sm hover:underline"
                  prefetch={false}
                >
                  Privacy
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

function ArrowUpIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
